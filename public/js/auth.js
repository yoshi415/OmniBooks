angular.module('omnibooks.auth', ['ui.bootstrap'])

.factory('auth', function(fireBase) {
  var loggedInUser = null; // updated when user logs in
  var loggedInOrg  = null;


  var signup = function (authInfo, success, failed) {
    var existingUser = fireBase.getUserInfo(authInfo.org, authInfo.name);
    existingUser.$loaded().then(function () {
      if(existingUser.userDetail){
        console.log('Already exists');
        failed('The username is already registered. Try another name.');
        return;
      }
      console.log('SIGNUP!');
      fireBase.createUser(authInfo, function () {
        setLoggedInInfo(authInfo);
        success();
      }, failed);
    });
  };

  var login = function (authInfo, success, failed) {
    var existingUser = fireBase.getUserInfo(authInfo.org, authInfo.name);
    existingUser.$loaded().then(function () {
      if(!existingUser.userDetail) {
        console.log('User not exists');
        failed('incorrect user name.');
        return;
      }
      authInfo.email = existingUser.userDetail.email;
      fireBase.authWithPassword(authInfo, function () {
        setLoggedInInfo(authInfo);
        success();
      }, failed);
    });
  };

  var setLoggedInInfo = function (authInfo) {
    loggedInUser = fireBase.getUserInfo(authInfo.org, authInfo.name);
    loggedInOrg  = authInfo.org;
  };

  var logOut = function () {
    loggedInUser = null;
  };

  var isLoggedIn = function () {
    return !!loggedInUser;
  };

  var getUsername = function() {
    return loggedInUser;
  };

  var getOrg = function() {
    return loggedInOrg;
  }


  return {
    signup: signup,
    login: login,
    loggedInUser: loggedInUser,
    loggedInOrg: loggedInOrg,
    isLoggedIn: isLoggedIn,
    logOut: logOut,
    getUsername: getUsername,
    getOrg: getOrg,
    signupShown: false
  };
});


angular.module('omnibooks')
.controller('authController', ['$scope', '$state', 'auth', 'fireBase', '$rootScope', function ($scope, $state, auth, fireBase, $rootScope) {
  $scope.orgs = ['purdue','Wellesley','Berkeley','Stanford'];
  $scope.authInfo = {org: 'purdue', name: '', email: '', password: ''};
  $scope.authInfo.org = $scope.orgs[0];
  $rootScope.loginBtnText = "Log in";
  $rootScope.loggedIn = false;

  $scope.clickSignup = function () {
    $rootScope.signupShown = true;
  };
  $scope.clickLogin = function () {
    if(auth.isLoggedIn()){
      logOut();
      return;
    }
    $rootScope.loginShown = true;
  };
  $scope.login = function () {
    hideError();
    auth.login($scope.authInfo, moveToMarket, showError);
  };
  $scope.signup = function () {

    auth.signup($scope.authInfo, moveToMarket, showError);
  };
  $scope.closeAuthForm = function () {
    $rootScope.signupShown = false;
    $rootScope.loginShown = false;
    hideError();
    resetUserInfo();
  };

  function moveToMarket() {
    $scope.closeAuthForm();
    $rootScope.loginBtnText = "Log out";
    $rootScope.loggedIn = true;
    $state.go("market");
  }
  function logOut() {
    auth.logOut();
    $rootScope.loginBtnText = "Log in";
    $rootScope.loggedIn = false;
    $state.go("home");
  }
  function showError(message) {
    $scope.errorMessage = message;
    $scope.error = true;
  }
  function hideError() {
    $scope.errorMessage = '';
    $scope.error = false;
  }
  function resetUserInfo() {
    $scope.authInfo = {org: 'purdue', name: '', email: '', password: ''};
  }
  $scope.closeAuthForm();

}])
.directive('authModal', function() {
  return {
    templateUrl: "../html/authForms.html",
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideSignup = function() {
        scope.show = false;
      };
    }
  };
})
.run(['$rootScope', '$state', 'auth', function ($rootScope, $state, auth) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if(toState.name === "home"){
      return;
    }
    if(!auth.isLoggedIn()){
      event.preventDefault();
      $state.go("home");
    }
  });
}]);
