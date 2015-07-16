angular.module('omnibooks.market', [])
.controller('marketController',['$state', '$scope','fireBase','$stateParams', function ($state, $scope,fireBase,$stateParams) {

  $scope.findDetail = function(book){
    $stateParams.itemId = book.$id;
    console.log(book.$id)
    var str = JSON.stringify(book)
    $state.go("books",{itemId:book.$id, book:str})
  }


  $scope.books = fireBase.allbooks;
}])