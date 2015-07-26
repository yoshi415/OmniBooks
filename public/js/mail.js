angular.module('omnibooks.mail', [])
  .controller('MailController', ['$scope', '$http', '$modal', 'fireBase', 'auth',
    function($scope, $http, $modal, fireBase, auth) {

      $scope.sendMail = function() {
        var currentOrg = auth.getOrg();
        var currentUser = auth.getUser().$id;

        // get current user's email       
        var emailFrom;
        var currentUserEmail = fireBase.getUserEmail(currentOrg, currentUser, function(data) {
          emailFrom = data;
        });
        console.log(emailFrom)

        // get seller's email
        var emailTo;
        var sellerUserEmail; // todo

        // get book details


        // aggregate info for email
        var msg = ({
          to: $scope.to,
          from: emailFrom,
          subject: $scope.subject,
          text: $scope.text
        });

        // post request to express routing
        $http.post('/sendMail', msg).
        success(function(data, status, headers, config) {
          console.log("message posted");
        }).
        error(function(data, status, headers, config) {
          console.log("error", data);
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
