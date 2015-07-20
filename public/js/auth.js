$(document).ready(function() {
  // handle the login and sign up form
  $('#jointop').on('click', function () {
    $('#signup_form').css({visibility: 'visible'});
    $('.signup_box').css({visibility : 'visible'});
  });
  $('#logintop').on('click', function () {
    $('#login_form').css({visibility: 'visible'});
    $('.login_box').css({visibility : 'visible'});
  });
  $('.close').on('click', closeAuthForm);
});


function closeAuthForm() {
  $('#login_form').css({visibility: 'hidden'});
  $('.login_box').css({visibility : 'hidden'});
  $('#signup_form').css({visibility: 'hidden'});
  $('.signup_box').css({visibility : 'hidden'});
}
