angular.module('omnibooks.market', [])
.controller('marketController',['$state', '$scope','fireBase','$stateParams','auth','$rootScope',
  function ($state, $scope, fireBase, $stateParams, auth, $rootScope) {
    console.log($rootScope.authInfo)
    $scope.findDetail = function(book){
      $stateParams.itemId = book.$id;
      $state.go("books",{itemId:book.$id});
    };
    $scope.books = fireBase.getOrgBook($rootScope.authInfo.org);
}]);