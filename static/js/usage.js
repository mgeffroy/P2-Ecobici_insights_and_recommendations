
function logic(response) {
  // console.log(response)
  var malevalues = response.filter(i => i.Genero_Usuario === "M");
  var femalevalues = response.filter(i => i.Genero_Usuario === "F");

  // console.log(femalevalues, malevalues)

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
    title: 'Total Number of Trips by Year & Gender',
    xaxis:{title: "Year"},
    yaxis:{title: "Total Trips"},
    height: 600,
    width: 1200
  };

  Plotly.newPlot('usagey', data, layout);

}

d3.json("/yearlygenderdata/").then(logic);

function logicmonth(response) {
  // console.log(response)
  var malevalues = response.filter(i => i.Genero_Usuario === "M");
  var femalevalues = response.filter(i => i.Genero_Usuario === "F");

  // console.log(femalevalues, malevalues)

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
    title: 'Total Number of Trips by Month & Gender',
    xaxis:{title: "Month"},
    yaxis:{title: "Total Trips"},
    height: 600,
    width: 1200
  };

  Plotly.newPlot('usagem', data, layout);

}

var selectButton = d3.select("#selYear");
selectButton.on("change", runEnter);

function runEnter() {
  var yearSelected = parseInt(selectButton.property("value"));
  console.log(yearSelected)
  d3.json("/genderyearmonthdata/"+yearSelected).then(logicmonth);
}

runEnter()