function postaviCarousel(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    function prikaziTrenutni() {
        glavniElement.innerHTML = `
            <div class="upit">
                <strong>Korisnik ID ${sviElementi[index].korisnikId}</strong>
                <p>${sviElementi[index].tekst}</p>
            </div>`;
    }

    function fnLijevo() {
        index = (index - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutni();
    }

    function fnDesno() {
        index = (index + 1) % sviElementi.length;
        prikaziTrenutni();
    }

    prikaziTrenutni();
    return {fnLijevo, fnDesno};
}

function postaviCarouselZahtjeva(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    function prikaziTrenutniZahtjev() {
        let status = sviElementi[index].odobren ? "odobren" : "odbijen";
        if(sviElementi[index].odobren == null){
            status = "na čekanju";
        }

        glavniElement.innerHTML = `
                <div class="zahtjev">
                    <strong>Korisnik ${sviElementi[index].korisnikId}<br><br></strong>
                    <strong>Zahtjev ${sviElementi[index].id}</strong>
                    <p>${sviElementi[index].tekst}</p>
                    <p>Datum zahtjeva: ${sviElementi[index].trazeniDatum}</p>
                    <p>Status zahtjeva: ${status}</p>
                </div>`;
       
    }

    function fnLijevoZahtjev() {
        index = (index - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutniZahtjev();
    }

    function fnDesnoZahtjev() {
        index = (index + 1) % sviElementi.length;
        prikaziTrenutniZahtjev();
    }

    prikaziTrenutniZahtjev();
    return {fnLijevoZahtjev, fnDesnoZahtjev};
}

function postaviCarouselPonuda(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    function prikaziTrenutnuPonudu() {
        let status = sviElementi[index].odbijenaPonuda ? "odbijena" : "odobrena";
        if(sviElementi[index].odbijenaPonuda == null){
            status = "na čekanju";
        }
        let cijena = ponude[0].cijenaPonude;
        PoziviAjax.getKorisnik((error, korisnik) => {
            if(korisnik && korisnik.admin) {
                glavniElement.innerHTML = `
                <div class="ponuda">
                    <strong>Korisnik ${sviElementi[index].korisnikId}<br><br></strong>
                    <strong>Ponuda ${sviElementi[index].id}</strong>
                    <p>${sviElementi[index].tekst}</p>
                    <p>Status ponude: ${status}</p>
                    <p>Cijena ponude: ${cijena}</p>
                    <p>Datum ponude: ${sviElementi[index].datumPonude}</p>
                    <p>Id Nekretnine: ${sviElementi[index].nekretninaId}</p>
                </div>`;
            } else {
                if(cijena) {
                    glavniElement.innerHTML = `
                    <div class="ponuda">
                        <strong>Korisnik ${sviElementi[index].korisnikId}<br><br></strong>
                        <strong>Ponuda ${sviElementi[index].id}</strong>
                        <p>${sviElementi[index].tekst}</p>
                        <p>Status ponude: ${status}</p>
                        <p>Cijena ponude: ${cijena}</p>
                    </div>`;
                } else {
                    glavniElement.innerHTML = `
                    <div class="ponuda">
                        <strong>Korisnik ${sviElementi[index].korisnikId}<br><br></strong>
                        <strong>Ponuda ${sviElementi[index].id}</strong>
                        <p>${sviElementi[index].tekst}</p>
                        <p>Status ponude: ${status}</p>
                    </div>`;
                }
            }
        });
       
    }

    function fnLijevoPonuda() {
        index = (index - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutnuPonudu();
    }

    function fnDesnoPonuda() {
        index = (index + 1) % sviElementi.length;
        prikaziTrenutnuPonudu();
    }

    prikaziTrenutnuPonudu();
    return {fnLijevoPonuda, fnDesnoPonuda};
}