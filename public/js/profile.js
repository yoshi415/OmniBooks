angular.module('omnibooks.profile', ['firebase'])
.controller('profileController',['$scope','fireBase', function ($scope,fireBase) {
  $scope.enterBook = function(title,url,author,subject){
    if(title !== "" && url !== "" && author !== "" && subject !== ""){
      console.log('enter!');
      var myDataRef = new Firebase('https://blazing-inferno-7614.firebaseio.com/orgs/');
      fireBase.enterBook(title,url,author,subject,myDataRef);
    }
  }
}])

.factory('fireBase', function($firebaseArray){
  // var myDataRef = new Firebase('https://blazing-inferno-7614.firebaseio.com/orgs/' + $scope.org + '/users/' + $scope.user + '/books');
  var enterBook = function(title,url,author,subject,fb){
    fb.push({title:title,url:url,author:author,subject:subject});
  }
  return {
    allbooks:$firebaseArray(myDataRef),
    enterBook:enterBook
  }
})