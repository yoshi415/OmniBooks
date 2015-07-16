angular.module('omnibooks.item', [])
.controller('itemController',['$scope','$stateParams','fireBase', function ($scope,$stateParams,fireBase) {
   $scope.itemId = $stateParams.itemId;
   $scope.book = fireBase.getBook($scope.itemId);
}]);