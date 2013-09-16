Template.auth.events({
  'submit #loginform': function(e) {
    e.preventDefault();

    var username = $(e.srcElement).find('#username').val(),
        password = $(e.srcElement).find('#password').val();

    Meteor.loginWithPassword(username, password, function(error) {
      if(error) {
        console.log('error!');
      } else {
        Router.go('/');
      }
    });
  },

  'click #logout': function(e) {
    e.preventDefault();

    Meteor.logout();
  },

  'click #reset': function(e) {
    e.preventDefault();

    Meteor.call('reset', function(error, result) {
      if(error || result !== true) return false;

      Router.go('/');
    });
  }
});

Template.auth.rendered = function() {
  var body = document.getElementsByTagName('body')[0];

  Hammer(body).on('swipedown', function(e) {
    e.gesture.preventDefault();

    Router.go('/');
  });
};