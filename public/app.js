angular.module('omnibooks', [
  'ui.router',
  'omnibooks.home',
  'omnibooks.profile',
  'omnibooks.item',
  'omnibooks.market',
  'omnibooks.database',
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
.controller('indexController', ['$scope','$location', '$state', '$firebaseObject', 'fireBase', function($scope, $location, $state, $firebaseObject, fireBase){

  $scope.goHome = function(){
    $location.path('/home');
  };
  $scope.goProfile = function(){
    $location.path('/profile');
  };

  $scope.goMarket = function(){
    $location.path('/market');
  };
  $scope.goItem = function(){
    $location.path('/item');
  };
  function isLoggedIn() {
    // TODO move isLoggedIn function to firebase service
    return fireBase.isLoggedIn();
  }

  var ref = new Firebase('https://shutorial.firebaseio.com');
  resetUserInfo();
  var root = $firebaseObject(ref);
  root.$bindTo($scope, "root");


  $scope.clickLogin = function () {
    if(isLoggedIn()){
      logOut();
      return;
    }
    showLoginForm();
  };
  $scope.clickSignin = function () {
    showSigninForm();
  };
  $scope.closeAuthForm = function () {
    $('#login_form').css({visibility: 'hidden'});
    $('.login_box').css({visibility : 'hidden'});
    $('#signup_form').css({visibility: 'hidden'});
    $('.signup_box').css({visibility : 'hidden'});
    hideError();
    resetUserInfo();
  };
  $scope.signup = function (newUser) {
    hideError();
    if(!firebase.getUser(newUser.name)){
      showError('The username is already registered. Try another name.');
      console.log('Already exists');
      return;
    }
    console.log('SIGNUP!');
    try {
      auth.signup();
      $state.go("market");
    } catch (err) {
      showError(err);
    }
  };


  $scope.login = function (user) {
    hideError();
    try {
      auth.login();
      $state.go("market");
      $scope.closeAuthForm();
      $('.red').val('Log out');
      $state.go("market");
    } catch (e) {
      showError(err);
    }
  };

  var logOut = function () {
    auth.logOut();
    $('.red').val('Login');
    $state.go("home");
  };

  function showError(message) {
    $('.error').css({visibility: 'visible'});
    $scope.erroMessage = message;
  }
  function hideError() {
    $scope.erroMessage = '';
    $('.error').css({visibility: 'hidden'});
  }

  function showLoginForm() {
    $('#login_form').css({visibility: 'visible'});
    $('.login_box').css({visibility : 'visible'});
  }
  function showSigninForm() {
    $('#signup_form').css({visibility: 'visible'});
    $('.signup_box').css({visibility : 'visible'});
  }
  function resetUserInfo() {
    $scope.newUser = {
      userDetail: {name: '', email: '', password: ''}
    };
    $scope.loginUser = {name: '', password: ''};
  }

}])

.run(['$rootScope', '$state', 'fireBase', function ($rootScope, $state, fireBase) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if(toState.name === "home"){
      return;
    }
    if(!fireBase.isLoggedIn()){
      // TODO move isLoggedIn function to firebase service
      event.preventDefault();
      $state.go("home");
    }
  })
}]);
