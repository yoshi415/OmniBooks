angular.module('omnibooks.profile', ['firebase'])
<<<<<<< HEAD
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
=======
  .controller('profileController', ['$scope', 'fireBase', function($scope, fireBase) {

    $scope.enterBook = function(title, url, author) {
      if (title !== "" && url !== "" && author !== "") {
        console.log('enter!');
        fireBase.enterBook(title, url, author);
      }
    };
  }])
  .factory('fireBase', function($firebaseArray, $firebaseObject) {
    var myDataRef = new Firebase('https://brilliant-heat-9814.firebaseio.com');
    var enterBook = function(title, url, author) {
      var str = randomString();
      myDataRef.push({
        title: title,
        url: url,
        author: author,
      });
    };
    var getBook = function(id) {
      var temp = myDataRef.child(id);
      return $firebaseObject(temp);
    };
    return {
      allbooks: $firebaseArray(myDataRef),
      enterBook: enterBook,
      getBook: getBook
    };
  });
>>>>>>> be7676acc7ea6a10a763070df7caae09e3009a67
