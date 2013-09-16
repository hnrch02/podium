Template.home.parseTime = function() {
  var rawTime = this.time;

  // Minutes and seconds
  var mins = ~~(rawTime / 60);
  var secs = rawTime % 60;

  // Hours, minutes and seconds
  var hrs = ~~(rawTime / 3600);
  var mins = ~~((rawTime % 3600) / 60);
  var secs = rawTime % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  ret = "";

  if (hrs > 0)
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

Template.home.events({
  'click .timecard': function(e, template) {
    if(!Meteor.user()) return false;

    Meteor.call('toggleSpeaking', this._id);
  },

  'tap .time': function(e, template) {
    if(!Meteor.user()) return false;

    Meteor.call('toggleSpeaking', this._id);
  }
});

Template.home.rendered = function() {
  var body = document.getElementsByTagName('body')[0];

  Hammer(body).on('swipeup', function(e) {
    e.gesture.preventDefault();

    Router.go('/auth');
  });

  $('.time').fitText(0.3);
};