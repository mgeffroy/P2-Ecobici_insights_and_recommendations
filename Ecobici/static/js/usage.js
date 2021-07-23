
function logic(response) {
    var filtervalues = response.map(i => [i.Genero_Usuario, Date(i.Usage_Timestamp)]);
    var malevalues = filtervalues.filter(i => i[0] === "M");
    var femalevalues = filtervalues.filter(i => i[0] === "F");
    
    console.log(filtervalues[1].getMonth())
}

    d3.json("static/js/usage.json").then(logic);