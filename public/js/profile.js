angular.module('omnibooks.profile', ['firebase', 'ui.bootstrap'])

.controller('profileController', ['$scope', 'fireBase', '$stateParams', '$modal', function($scope, fireBase, $stateParams, $modal) {
  $scope.enterBook = function(title, url, author, subject) {
      if (title !== "" && url !== "" && author !== "" && subject !== "" && ibsn !== "") {
        console.log('enter!');
        fireBase.enterBook(title, url, author, subject, isbn);
      }
    };
  $scope.userId = $stateParams.userId;
  $scope.profile = fireBase.loggedInUser; // sets user details for view
  $scope.books = fireBase.bookshelf;
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}])

.factory('fireBase', function($firebaseArray, $firebaseObject) {
  var loggedInUser = {name: 'Suzanne', org: 'mks'}; // updated when user logs in
  var bookshelf = [];
  var myDataRef = new Firebase('https://brilliant-heat-9814.firebaseio.com');
  var enterBook = function(title, url, author, subject, isbn) {
    myDataRef.push({
      title: title,
      url: url,
      author: author,
      subject: subject,
      isbn: isbn
    });
  };
  var getBook = function(id) {
    var temp = myDataRef.child(id);
    return $firebaseObject(temp);
  };

  var getUserBookshelf = function(user) {
    bookshelf = $firebaseArray(myDataRef.child(user));
    return bookshelf;
  };

  var setUserInfo = function(id) {
    loggedInUser = $firebaseObject(myDataRef.child(id)); //returns object with user details
    return loggedInUser;
  }

  return {
    allbooks: $firebaseArray(myDataRef),
    enterBook: enterBook,
    getBook: getBook,
    setUserInfo: setUserInfo,
    loggedInUser: loggedInUser
  };
})

.directive('modal', function() {
  return {
    templateUrl: "../html/bookUpload.html",
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    }
  };
});
