angular.module('omnibooks.profile', ['firebase'])

  .controller('profileController', ['$scope', 'fireBase', '$stateParams', function($scope, fireBase, $stateParams) {
    $scope.enterBook = function(title, url, author) {
      if (title !== "" && url !== "" && author !== "" && subject !== "") {
        console.log('enter!');
        fireBase.enterBook(title, url, author, subject);
      }
    };
    $scope.userId = $stateParams.userId;
  }])

  .factory('fireBase', function($firebaseArray, $firebaseObject) {
    // var myDataRef = new Firebase('https://blazing-inferno-7614.firebaseio.com/');
    var loggedInUser = {};
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
    var setUserInfo = function(id) {
      loggedInUser = $firebaseObject(myDataRef.child(id)); //returns object with user details
      return loggedInUser;
    }
    // var setUserInfo = function(userObj) {
    //   var userDb = myDataRef.child('users');
    //   myDataRef.push(obj);
    // }

    return {
      allbooks: $firebaseArray(myDataRef),
      enterBook: enterBook,
      getBook: getBook,
      setUserInfo: setUserInfo,
      loggedInUser: loggedInUser
    };
  });