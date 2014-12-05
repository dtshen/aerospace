var ge;

 var wasClicked=false;
  function switchview(){
    clear();
    if(wasClicked==false)
        {
          wasClicked=true;
	  generateCube();
    }
    else{

      wasClicked=false;
      generatePoints();
    }
  }
  function generatePoints(){
    var icon = ge.createIcon('');
    icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
    var style = ge.createStyle('');
    style.getIconStyle().setIcon(icon);
    style.getIconStyle().setScale(5);
    style.getLabelStyle().setScale(5);
    style.getLineStyle().getColor().set('9900ffff');
    var latSum = 0.0;
    var lonSum = 0.0;
    var placemark = [];
    var point = [];
    var balloon = [];
    var lineStringPlacemark = [];
    var lineString = [];
    if(Search.TLE!=null)
    {

      
      for(i=0;i<Search.TLE.length;i++)
      {
        console.log(Search.TLE[i]);
        //-----------------------------------------
        //Currently Junk data
        //-----------------------------------------
        var lat = Math.floor(Math.random() * 180) - 90;
        var lon = Math.floor(Math.random() * 360) - 180;
        var alti =Math.floor(Math.random() * 700000) + 500000;
        point[i] = ge.createPoint('');
        point[i].setLatitude(lat);
        point[i].setLongitude(lon);
        point[i].setAltitude(alti);
        point[i].setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
        latSum += lat;
        lonSum += lon;

        //Create and set placemark
        placemark[i] = ge.createPlacemark('');
        placemark[i].setStyleSelector(style);
        placemark[i].setName("sat" + i);
        placemark[i].setDescription("lat: " + lat + "\nlongitude: " + lon);
        placemark[i].setGeometry(point[i]);

        //Add placemark to map
          ge.getFeatures().appendChild(placemark[i]); 

        //Create and set a line string
        lineStringPlacemark[i] = ge.createPlacemark('');

        lineString[i] = ge.createLineString('');
        lineStringPlacemark[i].setGeometry(lineString[i]);
        lineString[i].setAltitudeMode(ge.ALTITUDE_ABSOLUTE);

        lineString[i].getCoordinates().pushLatLngAlt(lat, lon, 0);
        lineString[i].getCoordinates().pushLatLngAlt(lat, lon, alti);

        lineStringPlacemark[i].setStyleSelector(style);

        //Add line string to map
        ge.getFeatures().appendChild(lineStringPlacemark[i]);
             
      }

    }




  }

//set coordinates for the specified face of the cube
function cubeSide(latMin, latMax, lonMin, lonMax, altMin, altMax, sideNum) {
  var sidePoly = ge.createPolygon('');
  sidePoly.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);

  var side = ge.createLinearRing('');
  side.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);

  //1 front, 2 back, 3 top, 4 bottom, 5 left side, 6 right side
  if (sideNum == 1)
  {
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMin);
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMin);
  }
  if (sideNum == 2)
  {
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMax);
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMin);
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMin);
  }
  if (sideNum == 3)
  {
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMax);
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMax);
  }
  if (sideNum == 4)
  {
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMin);
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMin);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMin);
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMin);
  }
  if (sideNum == 5)
  {
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMin, altMin);
    side.getCoordinates().pushLatLngAlt(latMax, lonMin, altMin);
  }
  if (sideNum == 6)
  {
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMax);
    side.getCoordinates().pushLatLngAlt(latMin, lonMax, altMin);
    side.getCoordinates().pushLatLngAlt(latMax, lonMax, altMin);
  }

  sidePoly.setOuterBoundary(side);
  return sidePoly;
}

//set of functions to add or subtract a number from a latitude or
//longtitude. latitude or longitude wrap around if out of bounds
//and these functions handle that.
function latMin(lat, change) {
  var x = lat - change;
  if (x < -90)
  {
    var y = 90 - (-90 - x);  
    return y;
  }
  return x;
}
function latMax(lat, change) {
  var x = lat + change;
  if (x > 90)
  {
    var y = -90 + (x - 90);  
    return y;
  }
  return x;
}
function longMin(lon, change) {
  var x = lon - change;
  if (x < -180)
  {
    var y = 180 - (-180 - x);  
    return y;
  }
  return x;
}
function longMax(lon, change) {
  var x = lon + change;
  if (x > 180)
  {
    var y = -180 + (x - 180);  
    return y;
  }
  return x;
}

//Generates cubes on map using new data

function generateCube() {


  //Set style for placemark icon, placemark label, and line string
  //Placemark icon can be anything
  var icon = ge.createIcon('');
  icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  style.getIconStyle().setScale(2);
  style.getLabelStyle().setScale(5);
  style.getLineStyle().getColor().set('9900ffff');
  style.getLineStyle().setWidth(0.5);

  var gpsList = [];

  //Generate 10 random latitude, longtitude, and altitude triplets
  //Latitude and longitude in degrees, altitude in meters
  //Needs to be replaced with real data
  for (i = 0; i < 10; i++) {
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

  //Attempt at using real data
  //Note: altitude from positionGD is in km
  var numTLE = (Search.TLE).length;
  var tleLine1;
  var tleLine2;
  var satRec;
  var posVelocity;
  var timeNow = new Date();
  var yearUTC = timeNow.getUTCFullYear();
  var monthUTC = timeNow.getUTCMonth() + 1;
  var dayUTC = timeNow.getUTCDate();
  var hourUTC = timeNow.getUTCHours();
  var minuteUTC = timeNow.getUTCMinutes();
  var secondUTC = timeNow.getUTCSeconds();
  var positionECI;
  var positionGD;
  var gmst = satellite.gstime_from_date(yearUTC,monthUTC,dayUTC,hourUTC,minuteUTC,secondUTC); 
  for (i = 0; i < numTLE; i++)
  {
    tleLine1 = (Search.TLE).TLE_LINE1;
    tleLine2 = (Search.TLE).TLE_LINE2;
    //satRec = satellite.twoline2satrec(tleLine1,tleLine2);
    //posVelocity = satellite.propagate(satRec,yearUTC,monthUTC,dayUTC,hourUTC,minuteUTC,secondUTC);
    //positionECI = posVelocity.position;
    //positionGD = satellite.eci_to_geodetic(positionECI, gmst);
    gpsList[i+10] =
    {
      //lat : satellite.degrees_lat(positionGD.latitude),
      //lon : satellite.degrees_long(positionGD.longitude),
      //alt : (positionGD.height / 1.609) * 5280
    };
  } 

  //Initialize arrays and other variables
  var coords = gpsList;
  var coordsCount = coords.length;
  var latsum = 0.0;
  var lonsum = 0.0;
  var placemark;
  var point;
  var balloon = [];
  var cubePlacemark;
  var multiGeometry;
  var radius = 1.5;
  var height = 150000;
  var minLat;
  var maxLat;
  var minLong;
  var maxLong;
  var minAlt;
  var maxAlt;
  var temp;
  //var lineString;
  //var lineStringPlacemark;

  //Goes through all latitude, longitude, altitude triplets
  for (j = 0; j < coordsCount; j++) {
    //Create and set point for placemark
    point = ge.createPoint('');
    point.setLatitude(coords[j].lat);
    point.setLongitude(coords[j].lon);
    point.setAltitude(coords[j].alt);
    point.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
    //Create and set placemark
    placemark = ge.createPlacemark('');
    placemark.setStyleSelector(style);
    placemark.setName("sat" + j);
    placemark.setDescription("lat: " + coords[j].lat + "\nlongitude: " + coords[j].lon);
    placemark.setGeometry(point);

    latsum += coords[j].lat;
    lonsum += coords[j].lon;

    //Add placemark to map
    //ge.getFeatures().appendChild(placemark); 

    //create placemark for cube
    cubePlacemark = ge.createPlacemark('');
    cubePlacemark.setName("sat" + j);
    cubePlacemark.setDescription("latitude: " + coords[j].lat + " degrees" + "\nlongitude: " +
                               coords[j].lon + " degrees" + "\naltitude: "  + coords[j].alt
                 	       + " feet");

    //define dimensions for cube
    minAlt = coords[j].alt - height;
    maxAlt = coords[j].alt + height;
    minLat = latMin(coords[j].lat, radius);
    maxLat = latMax(coords[j].lat, radius);
    minLong = longMin(coords[j].lon, radius);
    maxLong = longMax(coords[j].lon, radius);

    if (minLat > maxLat)
    {
	    temp = maxLat;
	    maxLat = minLat;
	    minLat = temp;
    }
    if (minLong > maxLong)
    {
	    temp = maxLong;
	    maxLong = minLong;
	    minLong = temp;
    }

    //set coordinates for all six faces of cube
    multiGeometry = ge.createMultiGeometry('');
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,1));
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,2));
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,3));
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,4));
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,5));
    multiGeometry.getGeometries().appendChild(cubeSide(minLat,maxLat,minLong,maxLong,minAlt,maxAlt,6));


    cubePlacemark.setGeometry(multiGeometry);
    cubePlacemark.setStyleSelector(style);

    ge.getFeatures().appendChild(cubePlacemark);

    //Create and set a line string
    //lineStringPlacemark = ge.createPlacemark('');

    //lineString = ge.createLineString('');
    //lineStringPlacemark.setGeometry(lineString);
    //lineString.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);

    //lineString.getCoordinates().pushLatLngAlt(coords[j].lat, coords[j].lon, 0);
    //lineString.getCoordinates().pushLatLngAlt(coords[j].lat, coords[j].lon, coords[j].alt);

    //lineStringPlacemark.setStyleSelector(style);

    //Add line string to map
    //ge.getFeatures().appendChild(lineStringPlacemark);

	
    //Failed attempt at editing balloon window size
    //Could use html and css to edit balloon text and background
    //balloon[j] = ge.createHtmlStringBalloon('');
    //balloon[j].setFeature(lineStringPlacemark[j]);
    //balloon[j].setMinWidth(200);
    //balloon[j].setMaxHeight(300);
    //balloon[j].setCloseButtonEnabled(false);
  }

  //new viewpoint
  var lookAt = ge.createLookAt('');
  lookAt.set(latsum / coordsCount, lonsum / coordsCount, 14000000,
             ge.ALTITUDE_RELATIVE_TO_GROUND,0,0,20000);
  ge.getView().setAbstractView(lookAt);
}

function clear() {
  var features = ge.getFeatures();
  while (features.getFirstChild())
    features.removeChild(features.getFirstChild());
}






