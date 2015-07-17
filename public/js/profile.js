angular.module('omnibooks.profile', ['firebase'])

  .controller('profileController', ['$scope', 'fireBase', function($scope, fireBase) {
    $scope.enterBook = function(title, url, author) {
      if (title !== "" && url !== "" && author !== "" && subject !== "") {
        console.log('enter!');
        fireBase.enterBook(title, url, author, subject);
      }
    };
    $scope.profile = getUserInfo(id);
  }])

  .factory('fireBase', function($firebaseArray, $firebaseObject) {
    var myDataRef = new Firebase('https://brilliant-heat-9814.firebaseio.com');
    var enterBook = function(title, url, author, subject) {
      var str = randomString();
      myDataRef.push({
        title: title,
        url: url,
        author: author,
        subject: subject
      });
    };
    var getBook = function(id) {
      var temp = myDataRef.child(id);
      return $firebaseObject(temp);
    };
    var getUserInfo = function(id) {
      return $firebaseObject(myDataRef.child(id)); //returns object with user details
    }

    return {
      allbooks: $firebaseArray(myDataRef),
      enterBook: enterBook,
      getBook: getBook,
      getUserInfo: getUserInfo
    };
  });