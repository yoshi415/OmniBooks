angular.module('omnibooks.market', [])
  .controller('MarketController', ['$state', '$scope', '$stateParams', 'fireBase',
    function($state, $scope, $stateParams, fireBase) {
      $scope.findDetail = function(book) {
        $stateParams.itemId = book.$id;
        $state.go("books", {
          itemId: book.$id
        });
      };
      var org = 'purdue';
      var user = 'daichuqi';
      $scope.books = fireBase.getOrgBook(org);
    }
  ]);
