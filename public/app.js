angular.module('omnibooks', [
  'ui.router',
  'omnibooks.home',
  'omnibooks.profile',
  'omnibooks.item',
  'omnibooks.market',
  'firebase',
  'ui.bootstrap'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: 'html/home.html',
      controller: 'homeController'
    })
    .state('profile', {
      url:'/profile:userId',
      templateUrl: 'html/profile.html',
      controller: 'profileController'
    })
    .state('market', {
      url:'/market',
      templateUrl: 'html/market.html',
      controller: 'marketController'
    })
    .state('books', {
       url: '/item/:itemId',
       templateUrl: 'html/item.html',
       controller: 'itemController',
    });
})
.controller('indexController', ['$scope','$location', '$state', '$firebaseObject', function($scope,$location,$state,$firebaseObject){
  $scope.goHome = function(){
    $location.path('/home');
  };
  $scope.goProfile = function(){
    $location.path('/profile');
  };

  $scope.goMarket = function(id){
    $location.path('/market');
  };
  $scope.goItem = function(){
    $location.path('/item');
  }

  var ref = new Firebase('https://shutorial.firebaseio.com');
  $scope.newUser = {userDetail: {}};
  $scope.loginUser = {userDetail: {}};
  var root = $firebaseObject(ref);
  root.$bindTo($scope, "root");

  // FIXME in case users is not exits on the DB. This is not smart.
  // if(!$scope.root.org.users){
  //   $scope.root.org.users = {username: "dammy"};
  // }

  $scope.signup = function (user) {
    hideError();
    if($scope.root.org.users[$scope.newUser.userDetail.name]){
      showError('The username is already registered. Try another name.');
      console.log('Already exists');
      return;
    }
    console.log('before create');
    ref.createUser(user, function (err, userData) {
      if(err){
        showError('The email address is already registered.');
        console.error(err);
        return;
      }
      console.log('SIGNUP!');
      var password = $scope.newUser.userDetail.password;
      console.log('password: ', password);
      $scope.newUser.userDetail.password = null;
      $scope.root.org.users[$scope.newUser.userDetail.name] = $scope.newUser;
      ref.set({org:{users: $scope.root.org.users}});

      $scope.login({name: $scope.newUser.userDetail.name,
                    password: password});
    });
  };

  $scope.login = function (user) {
    hideError();
    var existingUser = $scope.root.org.users[user.name];
    if(!existingUser) {
      showError('incorrect user name');
      console.log('User not exists');
      return;
    }
    var authInfo = {email   : existingUser.userDetail.email,
                    password: user.password}
    ref.authWithPassword(authInfo, function (err, authData) {
      if(err){
        showError('incorrect password');
        console.error(err);
        return;
      }
      closeAuthForm();
      // TODO set User info in firebase service
      // firebase.setUserInfo(existingUser.$id);
      $state.go("market");
    });
  };

  function showError(message) {
    $('.error').css({visibility: 'visible'});
    $scope.erroMessage = message;
  }

  function hideError() {
    $scope.erroMessage = '';
    $('.error').css({visibility: 'hidden'});
  }

}]);
