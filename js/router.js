Search.Router.map(function() {
	this.resource('startpage', {path: '/'});
	this.resource('searchpage', {path: '/searchpage'}, function() {
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

Search.StartpageRoute = Ember.Route.extend({
	model: function() {
		return []
	},
});
