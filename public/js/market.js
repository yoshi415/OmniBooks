angular.module('omnibooks.market', [])
.controller('marketController',['$scope','fireBase',function ($scope,fireBase) {

  $scope.findDetail = function(book){
    console.log(book);
    $state.go("home")
  }
  $scope.books = fireBase.allbooks;

}])