angular.module('omnibooks.item', [])
.controller('itemController',['$scope','$stateParams','fireBase','bookAPI','$rootScope',
  function ($scope,$stateParams,fireBase,bookAPI,$rootScope) {
    var org = $rootScope.authInfo.org;
    var user = $rootScope.authInfo.name;
    var displayDetail = function(res){
      $scope.prices = res.data.data;
    }
    $scope.itemId = $stateParams.itemId;
    $scope.book = fireBase.getUserBook($scope.itemId,function(data){
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



