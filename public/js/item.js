angular.module('omnibooks.item', [])
  .controller('ItemController', ['$scope', '$stateParams', '$modal', 'fireBase', 'bookAPI', 'auth',
    function($scope, $stateParams, $modal, fireBase, bookAPI, auth) {
      var currentOrg = auth.getOrg();
      var currentUser = auth.getUser();
      var displayDetail = function(res) {
        $scope.prices = res.data.data;
      };
      $scope.itemId = $stateParams.itemId;
      $scope.book = fireBase.getUserBook(currentOrg, currentUser.$id, $scope.itemId, function(data) {
        bookAPI.getDetail(data.isbn, displayDetail);
      });

      $scope.modalShown = false;
      $scope.toggleModal = function() {
        if (!$scope.error) {
          $scope.modalShown = !$scope.modalShown;
        }
      };
    }
  ])
  .factory('bookAPI', function($http) {
    var key = 'UTUJEB5A';
    var getDetail = function(isbn, callback) {
      return $http({
          method: 'GET',
          url: '/bookDetail',
          params: {
            'book_isbn': isbn
          }
        })
        .then(function(res) {
          callback(res);
        });
    };

    return {
      getDetail: getDetail
    };
  });
