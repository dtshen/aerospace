window.Search = Ember.Application.create({
	LOG_TRANSITIONS: true
});

Search.Adapter = {
	ajax: function(searchParam) {
		var options = {
			type: 'POST',
			dataType: 'JSON',
			data: JSON.stringify(searchParam)
		};
		return ic.ajax.request("/json", options);
	}
};
//currently running into issues regarding reloading - dont know if there is a way to have it just load once.
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
      for (i = 0; i < 100; i++) {
        var a = Math.floor(Math.random() * 180) - 90;
        var b = Math.floor(Math.random() * 360) - 180;
        var c = Math.floor(Math.random() * 700000) + 500000;
        gpsList[i] =
        {
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

// Initialize Global Data
Search.Satcat = [];
Search.Decay = [];

	  