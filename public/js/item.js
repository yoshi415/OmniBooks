angular.module('omnibooks.item', [])
.controller('itemController',['$scope','$stateParams','fireBase','bookAPI',
  function ($scope,$stateParams,fireBase,bookAPI) {
    var org = 'purdue';
    var user = 'daichuqi'
    var displayDetail = function(res){
      $scope.prices = res.data.data;
    }
    $scope.itemId = $stateParams.itemId;
    $scope.book = fireBase.getUserBook(org,user,$scope.itemId,function(data){
      bookAPI.getDetail(data.isbn,displayDetail);
    });

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



