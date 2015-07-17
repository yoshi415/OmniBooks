angular.module('omnibooks.item', [])
.controller('itemController',['$scope','$stateParams','fireBase','bookAPI', function ($scope,$stateParams,fireBase,bookAPI) {
   $scope.itemId = $stateParams.itemId;
   $scope.book = fireBase.getBook($scope.itemId);
   $scope.getDetail = bookAPI.getDetail;


   $scope.displayDetail = function(res){
    $scope.detail = res;
   }

}])
.factory('bookAPI', function($http){

  var key = 'UTUJEB5A';
  var getDetail  = function(isbn,callback){
    console.log('click');
    return $http({
      method: 'GET',
      url:'http://isbndb.com/api/v2/xml/'+key+'/prices/'+isbn
    })
    .then(function(res){
      console.log(res.data);
      callback(res.data);
    });
  };

  return{
    getDetail:getDetail
  }
})



