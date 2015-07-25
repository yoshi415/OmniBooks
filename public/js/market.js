angular.module('omnibooks.market', [])
  .controller('MarketController', ['$state', '$scope', '$stateParams', 'fireBase', 'auth',
    function($state, $scope, $stateParams, fireBase, auth) {
      $scope.findDetail = function(book) {
        $stateParams.itemId = book.$id;
        $state.go("books", {
          itemId: book.$id
        });
      };
      var currentOrg = auth.getOrg();
      $scope.books = fireBase.getOrgBook(currentOrg);
    }
  ]);
