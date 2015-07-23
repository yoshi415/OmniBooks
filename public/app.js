angular.module('omnibooks', [
    'ui.router',
    'omnibooks.home',
    'omnibooks.profile',
    'omnibooks.item',
    'omnibooks.market',
    'omnibooks.database',
    'omnibooks.auth',
    'omnibooks.mail',
    'firebase'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'html/home.html',
        controller: 'homeController'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'html/profile.html',
        controller: 'profileController'
      })
      .state('market', {
        url: '/market',
        templateUrl: 'html/market.html',
        controller: 'marketController'
      })
      .state('books', {
        url: '/item/:itemId',
        templateUrl: 'html/item.html',
        controller: 'itemController',
      })
      .state('mail', {
        url: '/mail',
        templateUrl: 'html/mail.html',
        controller: 'mailController'
      });
  })
  .controller('indexController', ['$scope', '$location', '$state', '$firebaseObject', 'fireBase', function($scope, $location, $state, $firebaseObject, fireBase) {

    $scope.goHome = function() {
      $location.path('/home');
    };
    $scope.goProfile = function() {
      $location.path('/profile');
    };
    $scope.goMarket = function() {
      $location.path('/market');
    };
    $scope.goItem = function() {
      $location.path('/item');
    };
    $scope.goMail = function() {
      $location.path('/mail')
    };


    $scope.options = [{
      name: 'Purdue',
      value: 'Purdue'
    }, {
      name: 'Wellesley',
      value: 'Wellesley'
    }, {
      name: 'Berkeley',
      value: 'Berkeley'
    }, {
      name: 'Stanford',
      value: 'Stanford'
    }];
    $scope.selectedOption = $scope.options[0];

  }]);
