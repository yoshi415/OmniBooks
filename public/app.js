angular.module('omnibooks', [
  'ui.router',
  'omnibooks.home',
  'omnibooks.profile',
  'omnibooks.item',
  'omnibooks.market',
  'firebase'
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
      url:'/profile',
      templateUrl: 'html/profile.html',
      controller: 'profileController'
    })
    .state('item', {
      url:'/item',
      templateUrl: 'html/item.html',
      controller: 'itemController'
    })
    .state('market', {
      url:'/market',
      templateUrl: 'html/market.html',
      controller: 'marketController'
    })
})
.controller('indexController', ['$scope','$location', '$firebaseObject',function($scope,$location,$firebaseObject){
  $scope.goHome = function(){
    $location.path('/home');
  }
  $scope.goProfile = function(){
    $location.path('/profile');
  }

  $scope.goMarket = function(){
    $location.path('/market');
  }
  $scope.goItem = function(){
    $location.path('/item');
  }

  var ref = new Firebase('https://shutorial.firebaseio.com');
  $scope.newUser = {userDetail: {}};
  $scope.loginUser = {userDetail: {}};
  var root = $firebaseObject(ref);
  root.$bindTo($scope, "root");

  $scope.signup = function (user) {
    console.log('singup!!');
    $scope.existingName = '';
    $scope.existingEmail = '';
    if($scope.root.org.users[$scope.newUser.userDetail.name]){
      $scope.existingName = 'The username is already registered. Try another name.'
      console.log('Already exists');
      return;
    }
    console.log('before create');
    ref.createUser(user, function (err, userData) {
      if(err){
        $scope.existingEmail = 'The email address is already registered.';
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
    var existingUser = $scope.root.org.users[user.name];
    if(!existingUser) {
      console.log('User not exists');
      return;
    }
    ref.authWithPassword({email: existingUser.userDetail.email,
      password: user.password},
      function (err, authData) {
      if(err){
        console.error(err);
      } else {
        console.log('Authenticated!', authData);
        // TODO: close modal
        $('.md-modal').niftyModal("hide");
      }
    });
  };

}]);
