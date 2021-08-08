
function yearlylogic(response) {
  // console.log(response)
  var malevalues = response.filter(i => i.Gender === "M");
  var femalevalues = response.filter(i => i.Gender === "F");

  // console.log(femalevalues, malevalues)

  var trace1 = {
    x: malevalues.map(i => i.Year),
    y: malevalues.map(i => i.Count),
    name: 'Male',
    type: 'scatter'
  };

  var trace2 = {
    x: femalevalues.map(i => i.Year),
    y: femalevalues.map(i => i.Count),
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

function monthlylogic(response) {
  // console.log(response)
  var malevalues = response.filter(i => i.Gender === "M");
  var femalevalues = response.filter(i => i.Gender === "F");

  // console.log(femalevalues, malevalues)

  var trace1 = {
    x: malevalues.map(i => i.Month),
    y: malevalues.map(i => i.Count),
    name: 'Male',
    type: 'scatter'
  };

  var trace2 = {
    x: femalevalues.map(i => i.Month),
    y: femalevalues.map(i => i.Count),
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
  d3.json("/yearMonthlyByGender/"+yearSelected).then(monthlylogic);
}

runEnter()
d3.json("/yearlyByGender/").then(yearlylogic);