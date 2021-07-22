
// INITIALIZE MYMAP
var myMap = L.map("routes_map", {
  center: [
    19.4017, -99.1695
  ],
  zoom: 13
});
// HELPER FUNCTION TO GET STROKE WEIGHT, OPACITY AND COLORS
function getStrokeWeight(v) {
  return v > 40 ? [6, 1, '#99000d'] :
    v > 30 ? [5, .8, '#cb181d'] :
      v > 20 ? [4, .7, '#ef3b2c'] :
        v > 10 ? [3, .6, '#fb6a4a'] :
          [2, .5, '#fc9272'];
}

var selectButton = d3.select("#selYear");
selectButton.on("change", runEnter());

// MAIN FUNCTION RUN ENTER
// ====================================================================
function runEnter() {

  myMap.off();
  myMap.remove();

  var yearSelected = parseInt(selectButton.property("value"));

  // console.log(yearSelected);
  d3.json("static/temp_data/sorted_unique_routes_"+yearSelected+".json").then(routes => {
    // Define base layers
    var streetView = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });

    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetView,
      "Grayscale": grayscale,
    };

    // MARKERS LAYER
    // ============================================================

    var markers_to_plot = new L.LayerGroup();
    d3.json("static/temp_data/stationdata.json").then(markers => {

    markers.stations.forEach(marker=> {
      L.marker(marker.location)
        .bindPopup("<h5>" + marker.name + "</h5><hr>" + "Colonia: "+ marker.districtName + "<br>Station ID: " + marker.id)
        .on('mouseover', function (e) {
          this.openPopup()
        })
        .on('mouseout', function (e) {
          this.closePopup()
        })
        .addTo(markers_to_plot);
        });
    });

    // COLONIAS LAYER
    // ============================================================
    // var colonias_layer = new L.LayerGroup();
    // d3.json("colonias.json").then(colonias => {
    //   console.log(colonias);
    //   for (var i = 0; i < Object.keys(colonias).length; i++) {
    //     var colonia_data = colonias[i]['geo_shape'];

    //     L.polygon(colonia_data, {
    //       color: "purple",
    //       fillColor: "purple",
    //       fillOpacity: 1
    //     }).addTo(colonias_layer);
    //   };
    // });

    num_of_routes_to_plot = 250

    // HEATMAP LAYER
    // ============================================================

  var heat_to_plot = new L.LayerGroup();
  var heatArray = [];
  for (var i = 0; i < num_of_routes_to_plot; i++) {

    heatArray.push([routes[i]['Start_Station_Lat'], routes[i]['Start_Station_Lon']]);

  }
  L.heatLayer(heatArray, {
    radius: 20,
    blur: 15,
    minOpacity: .5,
    gradient: {
      0.5: 'blue',
     .60: 'green', 
     .7: 'yellow', 
     .8:'orange',
     .9: 'red'
    }

  }).addTo(heat_to_plot);


    // ROUTES FROM SELECTED YEAR
    // ============================================================
    var routes_to_plot = new L.LayerGroup();
    for (var i = 0; i < num_of_routes_to_plot; i++) {
      var line = [
        [routes[i]['Start_Station_Lat'], routes[i]['Start_Station_Lon']],
        [routes[i]['End_Station_Lat'], routes[i]['End_Station_Lon']]
      ];

      strokeSettings = getStrokeWeight(routes[i]['Total_Rides'])

      L.polyline(line, {
        color: strokeSettings[2],
        weight: strokeSettings[0],
        opacity: strokeSettings[1]
      })
        .addTo(routes_to_plot);
    };

    // CREATE MAP
    var overlayMaps = {
      'Top Routes': routes_to_plot,
      'Station Markers': markers_to_plot,
      'Heatmap Layer' : heat_to_plot,
      // 'Neighborhood Borders': colonias_layer,

    };
  
    var myMap = L.map("routes_map", {
      center: [
        19.4017, -99.1695
      ],
      zoom: 13,
      layers: [streetView, routes_to_plot, heat_to_plot]
    });

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  });
};

