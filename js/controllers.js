Search.SearchpageController = Ember.ObjectController.extend({

	actions: {
		submit: function () {
			var searchParam = {
				action: "query",
				class: "satcat",
				controller: "basicspacedata",
				limit: this.get('limit'),
				predicates:{
					SATNAME: this.get('name'),
					COUNTRY: this.get('country')
				}
			};

			// Put search parameters into model for displaying
			this.set('searchParam', searchParam);
			this.set('searchResult', []);

			// Post search parameters to API to get raw data
			// Adapter uses library ic-ajax here, which retuns a promise rather than raw data
			var controller = this;
			Search.Adapter.ajax(searchParam).then(function(data) {
				// Put raw data into model for display
				controller.set('satcat', JSON.stringify(data));
				controller.transitionToRoute('searchpage.table')
			});
		}
	}
});

Search.SearchpageTableController = Ember.ObjectController.extend({
});
