
function logic(response) {
    var filtervalues = response.map(i => [i.Genero_Usuario, i.Edad_Usuario]);
    var malevalues = filtervalues.filter(i => i[0] === "M");
    var femalevalues = filtervalues.filter(i => i[0] === "F");
    var malevaluesrange = malevalues.map(i => (i[1] / 10) | 0);
    var femalevaluesrange = femalevalues.map(i => (i[1] / 10) | 0);
    var malerangecount = count(malevaluesrange);
    var femalerangecount = count(femalevaluesrange);
    // scatter plot
    var fullrange = filtervalues.map(i => i[1]);
    var fullcount = countfull(fullrange);
    

    var trace1 = {
        x: Object.values(malerangecount),
        y: Object.keys(malerangecount),
        name: 'Total Male',
        orientation: 'h',
        marker: {
            color: 'rgba(55,128,191,0.6)',
            width: 1
        },
        type: 'bar'
    };
    
    var trace2 = {
        x: Object.values(femalerangecount),
        y: Object.keys(femalerangecount),
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
        title: 'Total Number of user by Age Range & Gender ',
        barmode: 'stack'
    };
    
    Plotly.newPlot('gender', data, layout);

    var trace1 = {
        x: Object.keys(fullcount),
        y: Object.values(fullcount),
        mode: 'markers'
        
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('scatter', data, layout);
}

function count(values) {
    var count = { "e10": 0, "e20": 0, "e30": 0, "e40": 0, "e50": 0, "e60": 0, "e70": 0, "e80": 0 }
    for (var i = 0; i < Object.keys(values).length; ++i) {
        // console.log(Object.keys(count)[i]);
    
        if(values[i] == 1)
        count.e10++;

        if(values[i] == 2)
        count.e20++;

        if(values[i] == 3)
        count.e30++;

        if(values[i] == 4)
        count.e40++;

        if(values[i] == 5)
        count.e50++;

        if(values[i] == 6)
        count.e60++;

        if(values[i] == 7)
        count.e70++;

        if(values[i] == 8)
        count.e80++;
    }
    return count;
}

function countfull(values) {
    var count = {}
    for (var i = 0; i < Object.keys(values).length; ++i) {
        if (String(values[i]) in count) {
            count[String(values[i])]++;
        } else {
            count[String(values[i])] = 1;
        }
    }
    return count;
}
d3.json("static/js/demographics.json").then(logic);




