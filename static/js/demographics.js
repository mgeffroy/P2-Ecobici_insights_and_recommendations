
function demoRangelogic(response) {

    // console.log(response)

    var malevalues = response.filter(i => i.Gender === "M");
    var femalevalues = response.filter(i => i.Gender === "F");
    
    // console.log(malevalues.map(i => i.Cantidad_Usuarios))

    var trace1 = {
        x: malevalues.map(i => i.Count),
        y: malevalues.map(i => i.Range),
        name: 'Total Male',
        orientation: 'h',
        marker: {
            color: 'rgba(55,128,191,0.6)',
            width: 1
        },
        type: 'bar'
    };
    
    var trace2 = {
        x: femalevalues.map(i => i.Count),
        y: femalevalues.map(i => i.Range),
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
        width: 1200,
        barmode: 'stack'
    };
    
    Plotly.newPlot('gender', data, layout);
}

function demoAgelogic(response) {

    // console.log(response)

    var trace1 = {
        y: response.map(i => i.Count),
        x: response.map(i => i.Age),
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

d3.json("/demoRange").then(demoRangelogic);
d3.json("/demoAge").then(demoAgelogic);
