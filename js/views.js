// This is the view object for creating data table visualization
// All the JS placed under didInsertElement will be called when /dataTable is loaded
Search.TableView = Ember.View.extend({
	didInsertElement: function() {
		console.log("Render data table");
		// Format fetched data for dataTable	
		var dataToDisplay = [];
		for (var i=0; i<Search.Satcat.length; i++) {
			var sat = Search.Satcat[i];
			var row = [sat.SATNAME, sat.COUNTRY, sat.OBJECT_TYPE,
				   sat.LAUNCH, sat.DECAY];
			dataToDisplay.push(row);
		}

		// Construct dataTable	
		$("#dataTable").dataTable({
			searching: false,
			paging: false,
			data: dataToDisplay,
			columns: [
				{title: "Name"},
				{title: "Country"},
				{title: "Type"},
				{title: "Launch Date"},
				{title: "Decay Date"},
			]
		});
	},
});
