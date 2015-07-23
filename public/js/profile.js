angular.module('omnibooks.profile', ['ui.bootstrap'])

.controller('profileController', ['$scope', 'fireBase', '$stateParams', '$modal', '$state', 'auth', 
  function($scope, fireBase, $stateParams, $modal, $state, auth) {
  $scope.enterBook = function(title, url, author, isbn) {
    if (title && url && author && isbn) {
      $scope.error = false;
      fireBase.enterBook($scope.org, $scope.username, title, url, author, isbn);
      console.log('successfully entered');
    } else {
      $scope.error = "*You must fill out all required fields";
    }
  };

  // set username and org
  $scope.username = auth.getUsername().$id;
  $scope.org = auth.getOrg();

  $scope.books = fireBase.getUserBookshelf($scope.org, $scope.username);

  // get book id in org node 
  $scope.getBookId = function(book) {
    return fireBase.getOrgBookId(book);
  };

  $scope.findDetail = function(book) {
    var id = $scope.getBookId(book);
    console.log(id);
    $stateParams.itemId = id;
    $state.go("books",{itemId:id});   
  };

  // modal methods
  $scope.animationsEnabled = true;
  $scope.modalShown = false;
  $scope.toggleUploadModal = function() {
    if(!$scope.error) {
      $scope.uploadModalShown = !$scope.uploadModalShown;
    }
  }; 
  $scope.toggleEditModal = function() {
    if(!$scope.error) {
      $scope.editModalShown = !$scope.editModalShown;
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
})

.directive('bookEdit', function() {
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
})
