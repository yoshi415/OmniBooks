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
  };

  //for signup
  var createUser = function(authInfo, success, failed){
    myDataRef.createUser(authInfo, function (err, userData) {
      if(err){
        failed('the email address is already registered.');
        return;
      }
      var ref = myDataRef.child(authInfo.org).child('users');
      ref.child(authInfo.name).set({
        userDetail: {
          email: authInfo.email
        }
      });
      success(authInfo);
    });
  };

  //for login
  var authWithPassword = function (authInfo, success, failed) {
    myDataRef.authWithPassword(authInfo, function (err, userData) {
      if(err){
        failed('incorrect password.');
        return;
      }
      success(authInfo);
    });
  };

  return {
    enterBook: enterBook,
    getOrgBook:getOrgBook,
    getUserBook: getUserBook,
    getUserInfo: getUserInfo,
    createUser:createUser,
    authWithPassword: authWithPassword
  };
});
