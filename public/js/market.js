angular.module('omnibooks.market', [])
.controller('marketController',['$scope','fireBase',function ($scope,fireBase) {

  // $scope.books = [
  // {
  //   url:'http://img.valorebooks.com/FULL/97/9781/978128/9781285057095.jpg',
  //   name:'Introduction to Calculus',
  //   author:'N/A'
  // },
  // {
  //   url:'http://ecx.images-amazon.com/images/I/51qtdIney4L._SX379_BO1,204,203,200_.jpg',
  //   name:'Fundamentals of Logic Design Signal Processing',
  //   author:'N/A'
  // }
  // ];

  $scope.books = fireBase.allbooks;

}]);