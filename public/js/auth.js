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
    getOrg: getOrg
  };
});


angular.module('omnibooks')
.controller('authController', ['$scope', '$state', 'auth', 'fireBase', function ($scope, $state, auth, fireBase) {
  $scope.orgs = ['Purdue','Wellesley','Berkeley','Stanford'];
  $scope.authInfo = {org: 'purdue', name: '', email: '', password: ''};
  $scope.authInfo.org = $scope.orgs[0];
  $scope.signupShown = false;
  $scope.loginShown = false;

  $scope.clickSignup = function () {
    $scope.signupShown = true;
  };
  $scope.clickLogin = function () {
    if(auth.isLoggedIn()){
      logOut();
      return;
    }
    $scope.loginShown = true;
  };
  $scope.login = function () {
    hideError();
    auth.login($scope.authInfo, function () {
      $scope.closeAuthForm();
      $('#logintop').text('Log out');
      $state.go("market");
    }, showError);
  };
  $scope.signup = function () {
    hideError();
    auth.signup($scope.authInfo, function () {
      $scope.closeAuthForm();
      $('#logintop').text('Log out');
      $state.go("market");
    }, showError);
  };
  $scope.closeAuthForm = function () {
    $scope.signupShown = false;
    $scope.loginShown = false;
    hideError();
    resetUserInfo();
  };

  function logOut() {
    auth.logOut();
    $('#logintop').text('Login');
    $state.go("home");
  }
  function showError(message) {
    $scope.erroMessage = message;
    $('.error').css({visibility: 'visible'});
  }
  function hideError() {
    $scope.erroMessage = '';
    $('.error').css({visibility: 'hidden'});
  }
  function resetUserInfo() {
    $scope.authInfo = {org: 'purdue', name: '', email: '', password: ''};
  }

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
        scope.signupShown = false;
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
