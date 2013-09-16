Meteor.methods({
  toggleSpeaking: function(partyId) {
    if(!Meteor.user())
      throw new Meteor.Error(401, "Unauthorized");

    var isSpeaking = Time.findOne({_id: partyId}).isSpeaking;

    Time.update({_id: partyId}, { $set: { isSpeaking: !isSpeaking } });

  },

  reset: function() {
    if(!Meteor.user())
      throw new Meteor.Error(401, "Unauthorized");

    Time.update({}, { $set: { time: 0, isSpeaking: false } }, {multi: true});

    return true;
  }
});

Meteor.setInterval(function() {
  var speaking = Time.find({isSpeaking: true});

  if(speaking.count() > 0) {

    speaking.forEach(function(party) {

      Time.update({_id: party._id}, { $inc: { time: 1 } });

    });

  }
}, 1000);