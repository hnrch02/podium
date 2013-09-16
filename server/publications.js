Meteor.publish('time', function() {
  return Time.find();
});