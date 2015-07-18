angular.module('omnibooks.market', [])
.controller('marketController',['$state', '$scope','fireBase','$stateParams', function ($state, $scope, fireBase, $stateParams) {

  $scope.findDetail = function(book){
    $stateParams.itemId = book.$id;
    $state.go("books",{itemId:book.$id});
  };
  $scope.books = fireBase.allbooks;
}]);
