angular.module('omnibooks.item', [])
  .controller('ItemController', ['$scope', '$stateParams', 'fireBase', 'bookAPI', 'auth',
    function($scope, $stateParams, fireBase, bookAPI, auth) {
      var currentOrg = auth.getOrg();
      var currentUser = auth.getUser();
      var displayDetail = function(res) {
        $scope.prices = res.data.data;
      };
      $scope.itemId = $stateParams.itemId;
      $scope.book = fireBase.getUserBook(currentOrg, currentUser.$id, $scope.itemId, function(data) {
        bookAPI.getDetail(data.isbn, displayDetail);
      });

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
