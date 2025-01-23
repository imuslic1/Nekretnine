function postaviCarousel(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    let page = 0;
    let pokupljeno = false;

    function prikaziTrenutni() {
        glavniElement.innerHTML = ` <div class="upit">
                                        <strong>Korisnik ID ${sviElementi[index].korisnik_id}</strong>
                                        <p>${sviElementi[index].tekst_upita}</p>
                                    </div>`;
    }

    function fnLijevo() {
        index = (index - 1 + sviElementi.length) % sviElementi.length;

        if(sviElementi.length % 3 == 0 && !pokupljeno && index == 0){
            page++;
            PoziviAjax.getNextUpiti(getNekretninaIdFromUrl(), page, (error, data) =>{
                if(error){
                    if(error == "Not Found"){
                        //ako je prazna lista upita
                        if(page == 0){
                            document.getElementById("upiti").innerHTML = `<div class="greske"><p>Nema postavljenih upita za ovu nekretninu.</p>`;
                        }
                        pokupljeno = true;
                        return;
                    }
                }
                
                sviElementi.push(...data);
            });
        }
        prikaziTrenutni();
    }

    function fnDesno() {
        index = (index + 1) % sviElementi.length;
        
        if(sviElementi.length % 3 == 0 && !pokupljeno && index == sviElementi.length - 1){
            page++;
            PoziviAjax.getNextUpiti(getNekretninaIdFromUrl(), page, (error, data) =>{
                if(error){
                    if(error == "Not Found"){
                        //ako je prazna lista upita
                        if(page == 0){
                            document.getElementById("upiti").innerHTML = `<div class="greske"><p>Nema postavljenih upita za ovu nekretninu.</p>`;
                        }
                        pokupljeno = true;
                        return;
                    }
                }
                
                sviElementi.push(...data);
            });
        }

        prikaziTrenutni();
    }

    prikaziTrenutni();

    return {fnLijevo, fnDesno};
}