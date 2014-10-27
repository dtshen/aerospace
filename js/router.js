Search.Router.map(function() {
	this.resource('searchpage', {path: '/'}, function() {
		this.route('table');
		this.route('other');
	});
});

Search.SearchpageRoute = Ember.Route.extend({
	model: function() {
		return []
	},
});
