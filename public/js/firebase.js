angular.module('omnibooks.database', ['firebase'])
  .factory('fireBase', function($firebaseArray, $firebaseObject) {
    var myDataRef = new Firebase('https://shutorial.firebaseio.com/');

    var enterBook = function(org, username, title, img, author, isbn, price) {
      var bookDetails = {
        title: title,
        img: img,
        author: author,
        isbn: isbn,
        createdBy: username,
        askingPrice: price
      };
      // push book details in org books and user bookshelf nodes
      var newBookRef = myDataRef.child(org).child('books').push(bookDetails);
      var bookID = newBookRef.key();
      myDataRef.child(org).child('users').child(username).child('bookshelf').child(bookID).set(bookDetails);
    };

    var deleteBook = function(org, user, bookId) {
      myDataRef.child(org).child('users').child(user).child('bookshelf').child(bookId).remove();
      myDataRef.child(org).child('books').child(bookId).remove()
    };

    //get all books in same org
    var getOrgBook = function(org){
      var ref = myDataRef.child(org).child('books');
      return $firebaseArray(ref);
    };

    //get one book from a user, return object
    var getUserBook = function(org, username, id, callback) {
      var ref = myDataRef.child(org).child('books').child(id);
      ref.on('value', function(dataSnapshot) {
        callback(dataSnapshot.val());
        ref.off();
      });
      console.log($firebaseObject(ref))
      return $firebaseObject(ref);
    };

    // returns array of all books belonging to a user
    var getUserBookshelf = function(org, username) {
      var ref = myDataRef.child(org).child('users').child(username).child('bookshelf');
      return $firebaseArray(ref);
    };

    //get user detail info, return object
    var getUserInfo = function(org, username) {
      return $firebaseObject(myDataRef.child(org).child('users').child(username));
    };

    //get user detail info, return object
    var getUserEmail = function(org, username, callback) {
      var ref = myDataRef.child(org).child('users').child(username).child('userDetail/email');
      ref.on('value', function(dataSnapshot) {
        callback(dataSnapshot.val());
        ref.off();
      })
      return $firebaseObject(ref);
    };

    //for signup
    var createUser = function(authInfo, success, failed) {
      myDataRef.createUser(authInfo, function(err, userData) {
        if (err) {
          failed('the email address is already registered.');
          return;
        }
        var users = myDataRef.child(authInfo.org).child('users');
        users.child(authInfo.name).set({
          userDetail: {
            email: authInfo.email
          }
        });
        var userOrg = myDataRef.child('userOrg');
        userOrg.child(authInfo.name).set(authInfo.org);
        success(authInfo);
      });
    };

    //return users list
    var getUserOrg = function() {
      return $firebaseObject(myDataRef.child('userOrg'));
    };

    //for login
    var authWithPassword = function(authInfo, success, failed) {
      myDataRef.authWithPassword(authInfo, function(err, userData) {
        if (err) {
          failed('incorrect password.');
          return;
        }
        success(authInfo);
      });
    };

    return {
      enterBook: enterBook,
      deleteBook: deleteBook,
      getOrgBook: getOrgBook,
      getUserBook: getUserBook,
      getUserBookshelf: getUserBookshelf,
      getUserInfo: getUserInfo,
      createUser: createUser,
      authWithPassword: authWithPassword,
      getUserOrg: getUserOrg,
      getUserEmail: getUserEmail
    };
  });
