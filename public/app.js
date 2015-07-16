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
    .state('market', {
      url:'/market',
      templateUrl: 'html/market.html',
      controller: 'marketController'
    })
    .state('books', {
       url: '/item/:itemId',
       templateUrl: 'html/item.html',
       controller: 'itemController',
    })
})
.controller('indexController', ['$scope','$location',function($scope,$location){
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
}]);