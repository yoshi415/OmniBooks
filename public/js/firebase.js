angular.module('omnibooks.database', ['firebase'])
.factory('fireBase', function($firebaseArray, $firebaseObject) {
  var myDataRef = new Firebase('https://shutorial.firebaseio.com/');
  var org = 'purdue';
  var username = 'richie';

  var enterBook = function(title, img, author, isbn) {
    myDataRef.child(org).child('books').push({
      title: title,
      img: img,
      author: author,
      isbn: isbn
    });
  };

  //get all books in same org
  var getOrgBook = function(org){
    var ref = myDataRef.child(org).child('books');
    return $firebaseArray(ref);
  };

  //get one book from a user, return object
  var getUserBook = function(org,username,id,callback) {
    var ref = myDataRef.child(org).child('books').child(id);
    ref.on('value', function(dataSnapshot) {
      callback(dataSnapshot.val());
      ref.off();
    });
    return $firebaseObject(ref);
  };

  //get user detail info, return object
  var getUserInfo = function(org,username){
    return $firebaseObject(myDataRef.child(org).child('users').child(username));
  }

  //for signup
  var createUser = function(org,username,password,email){
    var ref = myDataRef.child(org).child('users').child(username)
    ref.child('password').set(password);
    ref.child('email').set(email);
  }

  return {
    enterBook: enterBook,
    getOrgBook:getOrgBook,
    getUserBook: getUserBook,
    getUserInfo: getUserInfo,
    createUser:createUser
  };
})
