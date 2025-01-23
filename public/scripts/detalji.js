/* MOJ KOD 

document.addEventListener("DOMContentLoaded", () => {
    const glavniElement = document.getElementById("upiti");
    const sviElementi = Array.from(document.querySelectorAll(".upit"));
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");

    const pocetniElementi = glavniElement.innerHTML;

    const osnovnoDiv = document.getElementById("osnovno");
    const detaljiDiv = document.getElementById("detalji");
    const upitiDiv = document.getElementById("upiti");

    

    
    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            glavniElement.innerHTML = pocetniElementi;
        }
    });
    



    if (sviElementi.length <= 1) {
        return; 
    }

    const carousel = postaviCarousel(glavniElement, sviElementi);

    if (carousel) {
        previousButton.addEventListener("click", carousel.fnLijevo);
        nextButton.addEventListener("click", carousel.fnDesno);
    }
});

*/

function getNekretninaIdFromUrl() {
    const params = new URLSearchParams(window.location.search); // Uzima parametre iz URL-a
    return params.get('id'); // Vraća vrijednost parametra `id`
}

document.addEventListener('DOMContentLoaded', () => {
    const glavniElement = document.getElementById('upiti');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');

    const idNekretnine = getNekretninaIdFromUrl();
    let upiti = [];
    


    PoziviAjax.getNekretnina(idNekretnine, (error, data) =>{
        if(error){
            document.getElementById('osnovno').innerHTML = `<div class="greske"><p>Došlo je do greške.</p>`;
            return;
        }
        document.getElementById('slika').src = `../Resources/photos/${data.id}.jpg`;
        document.getElementById('naziv').innerHTML = `Naziv: ${data.naziv}`;
        document.getElementById('kvadratura').innerHTML = `Kvadratura: ${data.kvadratura}`;
        document.getElementById('cijena').innerHTML = `Cijena: ${data.cijena}`;
        document.getElementById('tip-grijanja').innerHTML = `Tip grijanja: ${data.tip_grijanja}`;
        document.getElementById('lokacija').innerHTML = `Lokacija: ${data.lokacija}`; //ubaci link
        document.getElementById('godina-izgradnje').innerHTML = `Godina izgradnje: ${data.godina_izgradnje}`;
        document.getElementById('datum-objave').innerHTML = `Datum objave: ${data.datum_objave.slice(-5,-1)}`;
        document.getElementById('opis').innerHTML = `<strong>Opis:</strong> <p>${data.opis}</p>`;

        upiti = data.upiti;
        console.log("Upiti pri pozivu", upiti);

        const carousel = postaviCarousel(glavniElement, upiti);
    
        if(carousel){
            previous.addEventListener('click', carousel.fnLijevo);
            next.addEventListener('click', carousel.fnDesno);
        }

        //return data;
    });

    

});