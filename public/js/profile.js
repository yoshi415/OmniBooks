angular.module('omnibooks.profile', ['firebase'])
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
