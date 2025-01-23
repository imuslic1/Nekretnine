function postaviCarousel(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    function prikaziTrenutni() {
        glavniElement.innerHTML = ` <div class="upit">
                                        <strong>Korisnik ID ${sviElementi[index].korisnik_id}</strong>
                                        <p>${sviElementi[index].tekst_upita}</p>
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