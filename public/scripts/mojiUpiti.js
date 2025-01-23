async function postaviUpite() {
    var listaMojihUpita = await PoziviAjax.getMojiUpiti((error, data) => {
        if(error) {
            if(error == "Not Found") {
                document.getElementById("upiti").innerHTML = `<p class="error">Niste postavili nijedan upit.</p>`;
                return;
            }
            else if(error == "Unauthorized") {
                document.getElementById("upiti").innerHTML = `<p class="error"> Morate biti prijavljeni kako biste pristupili ovoj stranici.<br><br><a href="prijava.html" style="font-weight:normal">Prijava</a></p>`;
                return;
            }
        }
      
        //set the gathered queries into a table with 1 column and as many rows as there are queries
        var upiti = `<div>`;
        for(var i = 0; i < data.length; i++) {
            upiti += `  <div class="upit">
                        <strong>Nekretnina: ${data[i].id_nekretnine}</strong>
                        <p>${data[i].tekst_upita}</p>
                        </div>`;
        }
        upiti += "</div>";
        document.getElementById("upiti").innerHTML = upiti;
                
    });

    return listaMojihUpita;
}

postaviUpite();