document.addEventListener("DOMContentLoaded", () => {
    const glavniElement = document.getElementById("upiti");
    const sviElementi = Array.from(document.querySelectorAll(".upit"));
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");

    const pocetniElementi = glavniElement.innerHTML;

    const osnovnoDiv = document.getElementById("osnovno");
    const detaljiDiv = document.getElementById("detalji");
    const upitiDiv = document.getElementById("upiti");

    

    /*
    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            glavniElement.innerHTML = pocetniElementi;
        }
    });
    */



    if (sviElementi.length <= 1) {
        return; 
    }

    const carousel = postaviCarousel(glavniElement, sviElementi);

    if (carousel) {
        previousButton.addEventListener("click", carousel.fnLijevo);
        nextButton.addEventListener("click", carousel.fnDesno);
    }
});