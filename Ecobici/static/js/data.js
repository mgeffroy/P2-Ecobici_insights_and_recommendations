// from data.js
// var tableData = data;

var table = d3.select("table>tbody");
var filterButton = d3.select("#filter-btn");


function handleChange(event) {

    d3.json("/viajesdata/2019").then(logic);
    
};

handleChange()


filterButton.on("click", handleChange);

function logic(response) {
    var data = response;
    values = {};
    values['Usage_Timestamp'] = d3.select("#date").property("value");
    var filteredValues = Object.entries(values).filter(i => i[1] != 0);
    table.text("");
    if (filteredValues != 0) {
        var filteredData = data;
        filteredValues.forEach(value => {
            filteredData = filteredData.filter(i => i[value[0]] === value[1]);
        });
        filteredData.forEach((value, i) => {
            var tr = table.append("tr");
            tr.append("td").text(i + 1);
            Object.values(value).forEach(j => {
                tr.append("td").text(j);
            });
        });
    } else {
        data.forEach((value, i) => {
            var tr = table.append("tr");
            tr.append("td").text(i + 1);
            Object.values(value).forEach(j => {
                tr.append("td").text(j);
            })
        });
    };
}
