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
    var str = randomString();
    myDataRef.push({
      title:title,
      url:url,
      author:author,
      id:str
    });
}

  var randomString = function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var str = '';
    for (var i = 0; i < 5; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  return {
    allbooks:$firebaseArray(myDataRef),
    enterBook:enterBook
  }

})