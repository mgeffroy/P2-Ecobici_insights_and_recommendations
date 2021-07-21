
markers = stations_data
colonia_boundaries = colonias_data[0]

// console.log(Object.keys(routes).length);
var myMap = L.map("map", {
  center: [
    19.4017, -99.1695
  ],
  zoom: 13
});

function getStrokeWeight(v) {
  return v > 40 ? [6, 1, '#99000d'] :
    v > 30 ? [5, .8, '#cb181d'] :
      v > 20 ? [4, .7, '#ef3b2c'] :
        v > 10 ? [3, .6, '#fb6a4a'] :
          [2, .5, '#fc9272'];
}

function runEnter() {

  myMap.off();
  myMap.remove();

  var yearSelected = parseInt(selectButton.property("value"));

  console.log(yearSelected);
  d3.json("sorted_unique_routes_"+yearSelected+".json").then(routes => {
    console.log("sorted_unique_routes_"+yearSelected+".json")
  // Once we get a response, send the data.features object to the createFeatures function
    // console.log(routes[1])
    // Define streetmap and darkmap layers
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

    // MARKERS
    // ============================================================

    var markers_to_plot = new L.LayerGroup();
    for (var i = 0; i < Object.keys(markers).length; i++) {
      var marker = markers[i];
      L.marker(marker.location)
        .bindPopup("<h1>" + marker.name + "</h1><hr>" + marker.districtName + "<br>Station ID: " + marker.id)
        .addTo(markers_to_plot);
    };

    // COLONIAS
    // ============================================================

    // var colonias = new L.LayerGroup();
    // for (var i = 0; i < Object.keys(colonia_boundaries).length; i++) {
    //   var colonia = colonia_boundaries[i]['geo_shape'];
    //   console.log(colonia);
    //   L.polygon([colonia], {
    //     color: "purple",
    //     fillColor: "purple",
    //     fillOpacity: 0.75
    //   }).addTo(colonias);
    // };

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
      'Heatmap Layer' : heat_to_plot
      // 'Neighborhood Borders': colonias,

    };

    var myMap = L.map("map", {
      center: [
        19.4017, -99.1695
      ],
      zoom: 13,
      layers: [streetView, routes_to_plot]
    });

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  });
};

var selectButton = d3.select("#selYear");
selectButton.on("change", runEnter());
