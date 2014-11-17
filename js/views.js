// This is the view object for creating data table visualization
// All the JS placed under didInsertElement will be called when /dataTable is loaded
Search.StartpageView = Ember.View.extend({
	didInsertElement: function() {
		document.body.style.background = '#308ECD';
	},
});

Search.SearchpageView = Ember.View.extend({
	didInsertElement: function() {
		document.body.style.background = '#FFFFFF';
	},
});

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

// View object to google map
// Code for render google map are placed here
Search.MapView = Ember.ContainerView.extend({
	id: 'map-canvas',
	tagName: 'div',
	attributeBindings: ['style'],
	style:"height: 400px; ",
	map:null,

	didInsertElement: function() {
	var mapOptions = {
		center: new google.maps.LatLng(28.405765,77.049479),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(this.$().get(0),mapOptions);
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	//Generate 100 random latitude, longtitude, and altitude triplets
	//Latitude and longitude in degrees, altitude in meters
	//Needs to be replaced with real data
	var gpsList = [];
	for (i = 0; i < Search.Satcat.length; i++) {
		var a = Math.floor(Math.random() * 180) - 90;
		var b = Math.floor(Math.random() * 360) - 180;
		var c = Math.floor(Math.random() * 700000) + 500000;
		gpsList[i] = {
			lat : a,
			lon : b,
			alt : c
		};
	}
	var coords = gpsList;
	var coordsCount = coords.length;
	for (j = 0; j < coordsCount; j++) {
		var myLatlng=new google.maps.LatLng(coords[j].lat,coords[j].lon);
		var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title:"Hello World!"
		});
	}
	this.set("map",map);
  }
});
