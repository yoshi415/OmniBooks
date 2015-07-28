angular.module('omnibooks.auth', [])
.factory('auth', function(fireBase) {
  var loggedInUser = null; // updated when user logs in
  var loggedInOrg = null;

  // success, failed are callbacks
  var signup = function(authInfo, success, failed) {
    // check the user-org object to see the username is available
    var userOrg = fireBase.getUserOrg();
    userOrg.$loaded().then(function() {
      var org = userOrg[authInfo.name];
      if (org) {
        console.log('user already exists');
        failed('The username is already registered. Try another name.');
        return;
      }

      // if available, save the user on the database
      fireBase.createUser(authInfo, function() {
        setLoggedInInfo(authInfo);
        success();
      }, failed);
    });
  };

  // success, failed are callbacks
  var login = function(authInfo, success, failed) {
    // check the user-org object to get the org of the user
    var userOrg = fireBase.getUserOrg();

    userOrg.$loaded().then(function() {
      var org = userOrg[authInfo.name];
      if (!org) {
        console.log('User not exists');
        failed('Incorrect username.');
        return;
      }

      authInfo.org = org;
      // get the email of the user to use firebase.authWithPassword
      var existingUser = fireBase.getUserInfo(org, authInfo.name);

      existingUser.$loaded().then(function() {
        authInfo.email = existingUser.userDetail.email;
        fireBase.authWithPassword(authInfo, function() {
          setLoggedInInfo(authInfo);
          success();
        }, failed);
      });
    });
  };

  // check if the user is loggedin and automatically set the loggedin info
  var autoLogin = function (callback) {
    fireBase.autoLogin(function (authInfo) {
      setLoggedInInfo(authInfo);
      callback();
    });
  };

  var setLoggedInInfo = function(authInfo) {
    loggedInUser = fireBase.getUserInfo(authInfo.org, authInfo.name);
    loggedInOrg = authInfo.org;
  };

  var logOut = function() {
    fireBase.logOut();
    loggedInUser = null;
  };

  var isLoggedIn = function() {
    return !!loggedInUser;
  };

  var getUser = function() {
    return loggedInUser;
  };

  var getOrg = function() {
    return loggedInOrg;
  };

  return {
    signup: signup,
    login: login,
    loggedInUser: loggedInUser,
    loggedInOrg: loggedInOrg,
    isLoggedIn: isLoggedIn,
    logOut: logOut,
    getUser: getUser,
    getOrg: getOrg,
    autoLogin: autoLogin
  };
});


angular.module('omnibooks')
  .controller('AuthController', ['$scope', '$state', 'auth', 'fireBase', '$rootScope', function($scope, $state, auth, fireBase, $rootScope) {
    $scope.orgs = ['Purdue', 'Wellesley', 'Berkeley', 'Stanford'];
    $scope.authInfo = {
      org: '',
      name: '',
      email: '',
      password: ''
    };
    $scope.authInfo.org = $scope.orgs[0];
    $rootScope.loginBtnText = "Login";
    $rootScope.loggedIn = false;

    $scope.clickSignup = function() {
      $scope.closeAuthForm();
      $rootScope.signupShown = true;
    };
    $scope.clickLogin = function() {
      if (auth.isLoggedIn()) {
        logOut();
        return;
      }
      $scope.closeAuthForm();
      $rootScope.loginShown = true;
    };
    $scope.login = function() {
      auth.login($scope.authInfo, moveToMarket, showError);
    };
    $scope.signup = function() {
      auth.signup($scope.authInfo, moveToMarket, showError);
    };
    $scope.closeAuthForm = function() {
      $rootScope.signupShown = false;
      $rootScope.loginShown = false;
      hideError();
      resetUserInfo();
    };

    function moveToMarket() {
      $scope.closeAuthForm();
      $rootScope.loginBtnText = "Logout";
      $rootScope.loggedIn = true;
      $state.go("market");
    }

    function logOut() {
      auth.logOut();
      $rootScope.loginBtnText = "Login";
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
      $scope.authInfo = {
        org: '',
        name: '',
        email: '',
        password: ''
      };
    }
    $scope.closeAuthForm();
    auth.autoLogin(function () {
      $rootScope.loginBtnText = "Logout";
      $rootScope.loggedIn = true;
      $state.go("market");
    });

  }])
  .run(['$rootScope', '$state', 'auth', function($rootScope, $state, auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.name === "home") {
        return;
      }
      if (!auth.isLoggedIn()) {
        event.preventDefault();
        $state.go("home");
      }
    });
  }]);
