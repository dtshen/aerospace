Search.Router.map(function() {
	this.resource('startpage', {path: '/'});
	this.resource('searchpage', {path: '/searchpage'}, function() {
			this.route('table');
			this.route('other');
			this.route('home');
			this.route('google-maps');
			this.route('google-earth');
	});
	
});

Search.SearchpageRoute = Ember.Route.extend({
	//redirects to home page.
	//redirect: function(){
	//	this.transitionTo('searchpage.home');
	//},
	//function will call when transitioning to a new route
	actions: {
	willTransition: function(transition) {
		//javascript hack to hide google earth
		var hidden=document.getElementById('map3d');
		hidden.style.display = 'none';
		}

	},
	model: function() {
		return []
	},
});

Search.StartpageRoute = Ember.Route.extend({
	model: function() {
		return []
	},
});
