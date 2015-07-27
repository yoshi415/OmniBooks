angular.module('omnibooks.mail', [])
  .controller('MailController', ['$scope', '$http', '$modal', 'fireBase', 'auth',
    function($scope, $http, $modal, fireBase, auth) {

      $scope.sendMail = function() {
        var currentOrg = auth.getOrg();
        var currentUser = auth.getUser().$id;
        var offerAmt = $scope.offer

        // get current user's email
        var emailFrom;
        var currentUserEmail = fireBase.getUserEmail(currentOrg, currentUser, function(data) {
          emailFrom = data;
        });
        console.log("email from: ", emailFrom)

        // get book details
        var bookOwner;
        var bookTitle;
        var bookAskingPrice;
        var bookInfo = fireBase.getUserBook(currentOrg, currentUser, $scope.itemId, function(data) {
          bookOwner = data.createdBy;
          bookTitle = data.title;
          bookAskingPrice = data.askingPrice;
        });

        // get seller's email
        var emailTo;
        var sellerUserEmail = fireBase.getUserEmail(currentOrg, bookOwner, function(data) {
          emailTo = data;
          // aggregate info for email
          var msg = ({
            to: emailTo,
            from: 'OmniBooks@OmniBooks.com',
            subject: "Hey, " + bookOwner + " - You have received an offer on " + bookTitle + "!",
            text: "You have received an offer on " + bookTitle + " for $" + offerAmt + "!\n" +
              "You posted this book for $" + bookAskingPrice + "\n" +
              "You can respond to this offer, by emailing the buyer at " + emailFrom + ".\n" +
              "Thanks for using OmniBooks!"
          });

          // post request to express routing
          $http.post('/sendMail', msg).
          success(function(data, status, headers, config) {
            console.log("message posted");
          }).
          error(function(data, status, headers, config) {
            console.log("error", data);
          });
        })
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
