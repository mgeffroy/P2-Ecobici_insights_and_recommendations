// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
routes = data[0]
console.log(Object.keys(routes).length);
var myMap = L.map("map").setView([19.4217, -99.1695], 14);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function getStrokeWeight(v) {
    return v > 400 ? [5, 1, '#99000d']  :
      v > 300 ? [4, .8, '#cb181d'] :
        v > 200 ? [3, .6, '#ef3b2c'] :
          v > 100 ? [2, .4, '#fb6a4a'] :
                [1, .2, '#fc9272'];
  }
  
  
  
  
  

for (var i = 0; i < Object.keys(routes).length; i++) {
  var line = [
    [ routes[i]['Start_Station_Lat'], routes[i]['Start_Station_Lon'] ],
    [ routes[i]['End_Station_Lat'], routes[i]['End_Station_Lon'] ]
  ];
  
  strokeSettings = getStrokeWeight(routes[i]['Total_Rides'])
  
  L.polyline(line, {
    color: '#cb181d',
    weight: strokeSettings[0],
    opacity: strokeSettings[1]
  }).addTo(myMap);
}

// Connect a black line from NYC to Toronto

