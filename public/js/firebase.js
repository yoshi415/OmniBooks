angular.module('omnibooks.database', ['firebase'])
.factory('fireBase', function($firebaseArray, $firebaseObject) {
  var myDataRef = new Firebase('https://shutorial.firebaseio.com/');
  var org = 'purdue';
  var username = 'richie';

  var enterBook = function(title, url, author, subject, isbn) {
    myDataRef.child(org).child(username).child('books').push({
      title: title,
      url: url,
      author: author,
      subject: subject,
      isbn: isbn
    });
  };

  //get all books in same org
  var getOrgBook = function(org){
    var ref = myDataRef.child(org);
    var users = $firebaseusersect(ref);
    var books = {};
    for(var username in users){
      for (var bookId in users[username].books)
        { books[bookId] = users[username].books[bookId]; }
    }
    return books;
  };

  //get all books from same user, return Array
  var getUserBooks = function(org,username) {
    var ref = myDataRef.child(org).child(username);
    return $firebaseArray(ref);
  };

  //get one book from a user, return object
  var getUserBook = function(org,username,id) {
    var ref = myDataRef.child(org).child(username).child(id);
    return $firebaseObject(ref);
  };

  //get user detail info, return object
  var getUserInfo = function(org,username){
    return $firebaseObject(myDataRef.child(org).child(username).child('userDetail'));
  };

  //for signup
  var createUser = function(authInfo, callback){
    myDataRef.createUser(authInfo, function (err, userData) {
      if(err){
        throw 'the email address is already registered.';
      }
      var ref = myDataRef.child(authInfo.org).child('users');
      var users = $firebaseObject(ref);
      console.log(users);
      ref.child(authInfo.name).set({
        userDetail: {
          email: authInfo.email
        }
      });
      callback(authInfo);
    });
  };

  //for login
  var authWithPassword = function (authInfo, callback) {
    myDataRef.authWithPassword(authInfo, function (err, userData) {
      if(err){
        throw 'incorrect password.';
      }
      callback(authInfo);
    });
  };

  return {
    enterBook: enterBook,
    getOrgBook:getOrgBook,
    getUserBooks: getUserBooks,
    getUserBook: getUserBook,
    getUserInfo: getUserInfo,
    createUser:createUser,
    authWithPassword: authWithPassword
  };
});
