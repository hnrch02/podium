Router.map(function() {
  this.route('home', {
    path: '/',
    data: function() {
      return Time.find({}, { sort: { name: 1 } });
    }
  });
  this.route('auth', { path: '/auth' });
});

Router.configure({
  layout: 'layout'
});