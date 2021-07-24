
function logic(response) {

    // console.log(response)

    var malevalues = response.filter(i => i.Genero_Usuario === "M");
    var femalevalues = response.filter(i => i.Genero_Usuario === "F");
    
    // console.log(malevalues.map(i => i.Cantidad_Usuarios))

    var trace1 = {
        x: malevalues.map(i => i.Cantidad_Usuarios),
        y: malevalues.map(i => i.Rango_Edad),
        name: 'Total Male',
        orientation: 'h',
        marker: {
            color: 'rgba(55,128,191,0.6)',
            width: 1
        },
        type: 'bar'
    };
    
    var trace2 = {
        x: femalevalues.map(i => i.Cantidad_Usuarios),
        y: femalevalues.map(i => i.Rango_Edad),
        name: 'Total Female',
        orientation: 'h',
        type: 'bar',
        marker: {
            color: 'rgba(255,153,51,0.6)',
            width: 1
        }
    };
    
    var data = [trace1, trace2];
    
    var layout = {
        title: 'Total Number of Trips by Age Range & Gender ',
        xaxis:{title: "Total Trips"},
        yaxis:{title: "Age Range"},
        height: 600,
        width: 1300,
        barmode: 'stack'
    };
    
    Plotly.newPlot('gender', data, layout);
}

d3.json("http://127.0.0.1:5000/demographicsrange").then(logic);
d3.json("http://127.0.0.1:5000/demographicsage").then(logic2);

function logic2(response) {

    // console.log(response)

    var trace1 = {
        y: response.map(i => i.Cantidad_Usuarios),
        x: response.map(i => i.Edad_Usuario),
        mode: 'line'
        
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Total Number of Trips by Age',
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis:{title: "Total Trips"},
        yaxis:{title: "Age"}
      };
      
      Plotly.newPlot('scatter', data, layout);
}




