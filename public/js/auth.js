// keeoing this file for future refactoring
angular.module('omnibooks.auth', ['firebase', 'ui.bootstrap'])

.factory('auth', function() {
  var loggedInUser = null; // updated when user logs in

  var signup = function (newUser) {
    if(!firebase.getUser(newUser.name)){
      console.log('Already exists');
      throw 'The username is already registered. Try another name.';
    }
    console.log('SIGNUP!');
    var password = newUser.password;
    console.log('password: ', password);
    newUser.password = null;
    firebase.createUser(newUser.name, newUser.email, newUser.password);
    loggedInUser = firebase.getUser(newUser.name);
    // login({
    //   name: newUser.name,
    //   password: password
    // });
  };


  var login = function (name, password) {
    var existingUser = firebase.getUser(name);
    if(!existingUser) {
      console.log('User not exists');
      throw 'incorrect user name.';
    }
    var authInfo = {email   : existingUser.userDetail.email,
                    password: password};
    firebase.authWithPassword(authInfo, function (err, authData) {
      if(err){
        console.error(err);
        throw 'incorrect password.';
      }
      loggedInUser = existingUser;
    });
  };


  var logOut = function () {
    loggedInUser = null;
    $('.red').val('Login');
    $state.go("home");
  };

  var isLoggedIn = function () {
    return !!loggedInUser;
  };

  return {
    loggedInUser: loggedInUser,
    isLoggedIn: isLoggedIn,
    logOut: logOut
  };
})


angular.module('omnibooks')
.run(['$rootScope', '$state', 'auth', function ($rootScope, $state, fireBase) {
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
