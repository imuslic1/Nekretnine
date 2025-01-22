function postaviUpite() {
    var listaMojihUpita = PoziviAjax.getMojiUpiti((error, data) => {
        if(error) {
            if(error == "Not Found") {
                document.getElementById("upiti").innerHTML = `<p class="error">Niste postavili nijedan upit.</p>`;
                return;
            }
            else if(error == "Unauthorized") {
                document.getElementById("upiti").innerHTML = `<p class="error"> Morate biti logirani kako biste pristupili ovoj stranici.<br><br><a href="prijava.html" style="font-weight:normal">Prijava</a></p>`;
                return;
            }
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