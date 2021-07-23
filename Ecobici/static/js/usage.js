
function logic(response) {
    // console.log(response)
    var malevalues = response.filter(i => i.Genero_Usuario === "M");
    var femalevalues = response.filter(i => i.Genero_Usuario === "F");

    console.log(femalevalues,malevalues)

    var trace1 = {
        x: malevalues.map(i => i.Usage_Year),
        y: malevalues.map(i => i.User_Count),
        name: 'Male',
        type: 'scatter'
      };
      
      var trace2 = {
        x: femalevalues.map(i => i.Usage_Year),
        y: femalevalues.map(i => i.User_Count),
        name: 'Female',
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'Total Number of user by Year & Gender'

    };

      Plotly.newPlot('usagey', data,layout);

}

    d3.json("static/js/usagey.json").then(logic);

    function logicmonth(response) {
        // console.log(response)
        var malevalues = response.filter(i => i.Genero_Usuario === "M");
        var femalevalues = response.filter(i => i.Genero_Usuario === "F");
    
        console.log(femalevalues,malevalues)
    
        var trace1 = {
            x: malevalues.map(i => i.Usage_Month),
            y: malevalues.map(i => i.User_Count),
            name: 'Male',
            type: 'scatter'
          };
          
          var trace2 = {
            x: femalevalues.map(i => i.Usage_Month),
            y: femalevalues.map(i => i.User_Count),
            name: 'Female',
            type: 'scatter'
          };
          
          var data = [trace1, trace2];
          
          var layout = {
            title: 'Total Number of user by Year & Gender'
    
        };
    
          Plotly.newPlot('usagem', data,layout);
    
    }
    
        d3.json("static/js/usagem.json").then(logicmonth);