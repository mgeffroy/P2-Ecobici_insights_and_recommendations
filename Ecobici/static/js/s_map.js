
// console.log(yearSelected);
d3.json("static/temp_data/stationdata.json").then(markers => {
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

 

  // CREATE MAP
  var overlayMaps = {
    'Station Markers': markers_to_plot,
    // 'Neighborhood Borders': colonias_layer,

  };

  var myMap = L.map("s_map", {
    center: [
      19.4017, -99.1695
    ],
    zoom: 13,
    layers: [streetView, markers_to_plot]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});

