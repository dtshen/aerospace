Search.Router.map(function() {
	this.resource('searchpage', {path: '/'}, function() {
		this.route('table');
		this.route('other');
		this.route('home');
	});
});

Search.SearchpageRoute = Ember.Route.extend({
	model: function() {
		return []
	},
});
