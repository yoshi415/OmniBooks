angular.module('omnibooks.mail', [])
  .controller('MailController', ['$scope', '$http', '$modal', 'fireBase',
    function($scope, $http, $modal, fireBase) {
      $scope.sendMail = function() {
        // collect info from form
        var msg = ({
          to: $scope.to,
          from: $scope.from,
          subject: $scope.subject,
          text: $scope.text
        });

        $http.post('/sendMail', msg).
        success(function(data, status, headers, config) {
          // console.log("message posted");
        }).
        error(function(data, status, headers, config) {
          // console.log("error");
        });
      };

      $scope.modalShown = false;
      $scope.toggleModal = function() {
        if (!$scope.error) {
          $scope.modalShown = !$scope.modalShown;
        }
      };
    }
  ])
  .directive('mailModal', ['', function() {
    return {
      scope: {
        show: '='
      },
      require: 'ngModel',
      restrict: 'A',
      templateUrl: "../html/mail.html",
      replace: true,
    };
  }]);
