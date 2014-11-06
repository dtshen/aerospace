Search.Router.map(function() {
	this.resource('searchpage', {path: '/'}, function() {
		this.route('table');
		this.route('other');
		this.route('home');
		this.route('google-maps');
	});
	
});

Search.SearchpageRoute = Ember.Route.extend({
	model: function() {
		return []
	},
});
