
// INITIALIZE MYMAP
var myMap = L.map("routes_map", {
  center: [
    19.4017, -99.1695
  ],
  zoom: 13,
});

// HELPER FUNCTION TO GET STROKE WEIGHT, OPACITY AND COLORS
function getStrokeWeight(v) {
  return v > 40 ? [6, 1, '#99000d'] :
    v > 30 ? [5, .8, '#cb181d'] :
      v > 20 ? [4, .7, '#ef3b2c'] :
        v > 10 ? [3, .6, '#fb6a4a'] :
          [2, .5, '#fc9272'];
}

// SET UP BASEMAPS
var streetView = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});


// Define a baseMaps object to hold the base layers
var baseMaps = {
  "Street Map": streetView,
  "Grayscale": grayscale,
};

// SET UP MARKERS LAYER
var markers_to_plot = new L.LayerGroup();

d3.json("http://127.0.0.1:5000/stationdata").then(function (response) {

  for (var i = 0; i < response.length; i++) {

    var location = L.latLng(response[i]['LAT'], response[i]['Lon']);
    // console.log(location)

    if (location) {
      L.marker(location)
        .bindPopup("<h5>" + response[i]['Name'] + "</h5><hr>" + "Colonia: " + response[i]['districtName'] + "<br>Station ID: " + response[i]['ID'])
        .on('mouseover', function (e) {
          this.openPopup()
        })
        .on('mouseout', function (e) {
          this.closePopup()
        })
        .addTo(markers_to_plot);

    };
  };
});

// SET UP COLONIAS LAYER
var colonias_layer = new L.LayerGroup();

d3.json("http://127.0.0.1:5000/coloniadata").then(colonias => {
  // console.log(colonias);
  for (var i = 0; i < Object.keys(colonias).length; i++) {
    var colonia_data = colonias[i]['geo_shape'];

    L.polygon(colonia_data, {
      color: "#C73824",
      fillColor: "transparent",
      fillOpacity: 0,
      weight: 1
    }).addTo(colonias_layer);
  };
});

var overlayMaps = {
  'Station Markers': markers_to_plot,
  'Neighborhood Borders': colonias_layer,
};

var control = L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// SET UP EVENT LISTENER
var selectButton = d3.select("#selYear");
selectButton.on("change", runEnter);

// // MAIN FUNCTION RUN ENTER
// // ====================================================================
function runEnter() {
  
  // Clear the initialized map
  myMap.remove()

  // Set new variable for value from pull down menu
  var yearSelected = parseInt(selectButton.property("value"));

  // Set new variables for routes and heat layers
  var routes_to_plot = new L.LayerGroup();
  var heat_to_plot = new L.LayerGroup();

  // Call API with D3
  d3.json("/routedata/" + yearSelected).then(routes => {

    // Establish variable for number of routes to plot
    num_of_routes_to_plot = 250

    // SET UP ROUTES LAYER

    // For loop to set up routes to trace as L.polylines
    for (var i = 0; i < num_of_routes_to_plot; i++) {
      var line = [
        [routes[i]['Retiro_Lat'], routes[i]['Retiro_Lon']],
        [routes[i]['Arribo_Lat'], routes[i]['Arribo_Lon']]
      ];

      // Call helper function to get formatting configurations 
      strokeSettings = getStrokeWeight(routes[i]['Trips']);

      // Add L.polylines to layers with formatting
      L.polyline(line, {
        color: strokeSettings[2],
        weight: strokeSettings[0],
        opacity: strokeSettings[1]
      })
        .addTo(routes_to_plot);
    };

    // SET UP HEATMAP LAYER
    // ============================================================


    // Run loop to get heat values
    var heatArray = [];
    for (var i = 0; i < num_of_routes_to_plot; i++) {
      heatArray.push([routes[i]['Retiro_Lat'], routes[i]['Retiro_Lon']]);
    }
    // Set up L.heatLayer
    L.heatLayer(heatArray, {
      radius: 20,
      blur: 15,
      minOpacity: .5,
      gradient: {
        0.5: 'blue',
        .60: 'green',
        .7: 'yellow',
        .8: 'orange',
        .9: 'red'
      }
    }).addTo(heat_to_plot);
  });

  // Reset overlay maps
  var overlayMaps = {
    'Top Routes': routes_to_plot,
    'Station Markers': markers_to_plot,
    'Heatmap Layer': heat_to_plot,
    'Neighborhood Borders': colonias_layer,
  };
  
  // Update myMap
  myMap = L.map("routes_map", {
    center: [
      19.4017, -99.1695
    ],
    zoom: 13,
    layers: [streetView, routes_to_plot, 
      heat_to_plot]
  });

//  Update control
 control = L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};

runEnter()