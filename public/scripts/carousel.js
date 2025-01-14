function postaviCarousel(glavniElement, sviElementi, index = 0) {
    if(glavniElement === null || glavniElement === undefined || sviElementi.length === 0 || index < 0 || index >= sviElementi.length) {
        return null;
    }

    function prikaziTrenutni() {
        glavniElement.innerHTML = sviElementi[index].outerHTML;
    }

    function fnLijevo() {
        index = (index - 1 + sviElementi.length) % sviElementi.length;
        prikaziTrenutni();
    }

    function fnDesno() {
        index = (index + 1) % sviElementi.length;
        prikaziTrenutni();
    }    

    return {fnLijevo, fnDesno};
}