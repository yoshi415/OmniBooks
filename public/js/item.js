angular.module('omnibooks.item', [])
.controller('itemController',['$scope','$stateParams','fireBase','bookAPI',
  function ($scope,$stateParams,fireBase,bookAPI) {
    $scope.itemId = $stateParams.itemId;
    $scope.book = fireBase.getBook($scope.itemId);
    $scope.getDetail = bookAPI.getDetail;
    $scope.displayDetail = function(res){
      $scope.prices = {};
      if(res.data.error){
        $scope.prices.price = res.data.error;
      }else{
        $scope.prices = res.data.data;
      }
     }
}])
.factory('bookAPI', function($http){
  var key = 'UTUJEB5A';
  var getDetail  = function(isbn,callback){
    return $http({
      method: 'GET',
      url:'/bookDetail',
      params: {'book_isbn': isbn}
    })
    .then(function(res){
      callback(res);
    });
  };

  return{
    getDetail:getDetail
  }
})



