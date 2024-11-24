document.addEventListener("DOMContentLoaded", () => {
    const glavniElement = document.getElementById("upiti");
    const sviElementi = Array.from(document.querySelectorAll(".upit"));
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");

    if (sviElementi.length <= 1) {
        return; 
    }

    const carousel = postaviCarousel(glavniElement, sviElementi);

    if (carousel) {
        previousButton.addEventListener("click", carousel.fnLijevo);
        nextButton.addEventListener("click", carousel.fnDesno);
    }
});