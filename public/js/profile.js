angular.module('omnibooks.profile', ['ui.bootstrap'])

.controller('profileController', ['$scope', 'fireBase', '$stateParams', '$modal', function($scope, fireBase, $stateParams, $modal) {
  $scope.enterBook = function(title, url, author, isbn) {
    if (title && url && author && isbn) {
      $scope.error = false;
      fireBase.enterBook(title, url, author, isbn);
      console.log('successfully entered');
    } else {
      $scope.error = "You must fill out all required fields";
    }
  };
  $scope.userId = $stateParams.userId;
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    if(!$scope.error) {
      $scope.modalShown = !$scope.modalShown;
    }
  };
}])
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
