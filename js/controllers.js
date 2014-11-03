Search.SearchpageController = Ember.ObjectController.extend({

	actions: {
		submit: function () {
			this.set('loading', true);
			// Setup search parameters for Satcat and Decay
			var searchParamSatcat = {
				action: "query",
				class: "satcat",
				controller: "basicspacedata",
				limit: this.get('limit'),
				predicates:{
					SATNAME: this.get('name'),
					COUNTRY: this.get('country')
				}
			};
			var searchParamDecay = {
				action: "query",
				class: "decay",
				controller: "basicspacedata",
				limit: this.get('limit'),
				predicates:{
					SATNAME: this.get('name'),
					COUNTRY: this.get('country')
				}
			};

			this.set('satcat', []);
			this.set('decay', []);

			// Post search parameters to API to get raw data
			// Adapter uses library ic-ajax here, which retuns a promise rather than raw data
			var controller = this;
			Search.Adapter.ajax(searchParamSatcat).then(function(satcatData) {
			Search.Adapter.ajax(searchParamDecay).then(function(decayData) {
				// Use global to store data
				Search.Satcat = satcatData;
				Search.Decay = decayData;
				// Hide load spinner
				controller.set('loading', false);
				controller.transitionToRoute('searchpage.home');
			});
			});
		}
	}
});

Search.SearchpageTableController = Ember.ObjectController.extend({
});
