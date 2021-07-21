// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
routes_2010 = data_2010[0]
routes_2012 = data_2012[0]
routes_2014 = data_2014[0]
routes_2016 = data_2016[0]
routes_2018 = data_2018[0]
routes_2020 = data_2020[0]
markers = stations_data
colonia_boundaries = colonias_data[0]

// console.log(Object.keys(routes).length);


function getStrokeWeight(v) {
    return v > 40 ? [6, 1, '#99000d']  :
      v > 30 ? [5, .8, '#cb181d'] :
        v > 20 ? [4, .7, '#ef3b2c'] :
          v > 10 ? [3, .6, '#fb6a4a'] :
                [2, .5, '#fc9272'];
  }
  
  // Object.keys(routes).length

// '#cb181d',
// Connect a black line from NYC to Toronto

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

  num_of_routes_to_plot = 100

  // 2010 Routes
  // ============================================================
  var routes_toplot_2010 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2010[i]['Start_Station_Lat'], routes_2010[i]['Start_Station_Lon'] ],
      [ routes_2010[i]['End_Station_Lat'], routes_2010[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2010[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2010);
  };

  // 2012 Routes
  // ============================================================
  var routes_toplot_2012 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2012[i]['Start_Station_Lat'], routes_2012[i]['Start_Station_Lon'] ],
      [ routes_2012[i]['End_Station_Lat'], routes_2012[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2012[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2012);
  };

  // 2014 Routes
  // ============================================================
  var routes_toplot_2014 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2014[i]['Start_Station_Lat'], routes_2014[i]['Start_Station_Lon'] ],
      [ routes_2014[i]['End_Station_Lat'], routes_2014[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2014[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2014);
  };
// 2016 Routes
  // ============================================================
  var routes_toplot_2016 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2016[i]['Start_Station_Lat'], routes_2016[i]['Start_Station_Lon'] ],
      [ routes_2016[i]['End_Station_Lat'], routes_2016[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2016[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2016);
  };

  // 2018 Routes
  // ============================================================
  var routes_toplot_2018 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2018[i]['Start_Station_Lat'], routes_2018[i]['Start_Station_Lon'] ],
      [ routes_2018[i]['End_Station_Lat'], routes_2018[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2018[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2018);
  };

    // 2020 Routes
  // ============================================================
  var routes_toplot_2020 = new L.LayerGroup();
  for (var i = 0; i < num_of_routes_to_plot; i++) {
    var line = [
      [ routes_2020[i]['Start_Station_Lat'], routes_2020[i]['Start_Station_Lon'] ],
      [ routes_2020[i]['End_Station_Lat'], routes_2020[i]['End_Station_Lon'] ]
    ];
    
    strokeSettings = getStrokeWeight(routes_2020[i]['Total_Rides'])
    
    L.polyline(line, {
      color: strokeSettings[2],
      weight: strokeSettings[0],
      opacity: strokeSettings[1]
    })
      .addTo(routes_toplot_2020);
  };

  // CREATE MAP
  var overlayMaps = {
    'Station Markers': markers_to_plot,
    // 'Neighborhood Borders': colonias,
    '2010 Top Routes': routes_toplot_2010,
    '2012 Top Routes': routes_toplot_2012,
    '2014 Top Routes': routes_toplot_2014,
    '2016 Top Routes': routes_toplot_2016,
    '2018 Top Routes': routes_toplot_2018,
    '2020 Top Routes': routes_toplot_2020

  };

  var myMap = L.map("map", {
    center: [
      19.4017, -99.1695
    ],
    zoom: 13,
    layers: [streetView, routes_toplot_2010]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

