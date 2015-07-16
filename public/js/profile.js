angular.module('omnibooks.profile', ['firebase'])
.controller('profileController',['$scope','fireBase', function ($scope,fireBase) {

  $scope.enterBook = function(title,url,author){
    if(title !== "" && url !== "" && author !== ""){
      console.log('enter!');
      fireBase.enterBook(title,url,author);
    }
  }

}])
.factory('fireBase', function($firebaseArray){
  var myDataRef = new Firebase('https://brilliant-heat-9814.firebaseio.com');
  var enterBook = function(title,url,author){
    myDataRef.push({title:title,url:url,author:author});
  }
  return {
    allbooks:$firebaseArray(myDataRef),
    enterBook:enterBook
  }

})