function postaviUpite() {
    var listaMojihUpita = PoziviAjax.getMojiUpiti((error, data) => {
        if(error) {
            console.log("GREŠKA:", error);
            document.getElementById("upiti").innerHTML = `<p>${error}</p>`;
            return;
        }
        if(data.length == 0) {
            document.getElementById("upiti").innerHTML = "<p>Niste postavili nijedan upit.</p>";
            return;
        }
        //set the gathered queries into a table with 1 column and as many rows as there are queries
        var table = "<table>";
        for(var i = 0; i < data.length; i++) {
            table += "<tr><td>" + "Nekretnina " + data[i].id_nekretnine + ": " + data[i].tekst_upita + "</td></tr>";
        }
        table += "</table>";
        document.getElementById("upiti").innerHTML = table;
                
    });

    return listaMojihUpita;
}

postaviUpite();