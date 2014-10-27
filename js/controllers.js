Search.SearchpageController = Ember.ObjectController.extend({

	actions: {
		submit: function () {
			var rawData = {
				name: this.get('name'),
				country: this.get('country')
			};

			this.set('searchParam', rawData);
			this.set('searchResult', []);

			this.transitionToRoute('searchpage.table')
		}
	}
});

Search.SearchpageTableController = Ember.ObjectController.extend({
});
