// INITIALIZE MYMAP
var myMap = L.map("s_map", {
  center: [19.4017, -99.1695],
  zoom: 13
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var markers_url = "stationdata.json";

// Grab the data with d3
d3.json(markers_url).then(function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < Object.keys(response.stations).length; i++) {

    // Set the data location property to a variable
    var location = response.stations[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker(location)
        .bindPopup(response.stations[i].name));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

