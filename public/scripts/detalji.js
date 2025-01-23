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
        document.getElementById('naziv').innerHTML = `<strong> Naziv: </strong> ${data.naziv}`;
        document.getElementById('kvadratura').innerHTML = `<strong> Kvadratura: </strong> ${data.kvadratura}`;
        document.getElementById('cijena').innerHTML = `<strong> Cijena: </strong> ${data.cijena}`;
        document.getElementById('tip-grijanja').innerHTML = `<strong> Tip grijanja: </strong> ${data.tip_grijanja}`;
        document.getElementById('lokacija').innerHTML = `<strong> Lokacija: </strong> ${data.lokacija}`; //ubaci link
        document.getElementById('godina-izgradnje').innerHTML = `<strong> Godina izgradnje: </strong> ${data.godina_izgradnje}`;
        document.getElementById('datum-objave').innerHTML = `<strong> Datum objave: </strong> ${data.datum_objave.slice(-5,-1)}`;
        document.getElementById('opis').innerHTML = `<strong> Opis: </strong> <p>${data.opis}</p>`;

        upiti = data.upiti;
        console.log("Upiti pri pozivu", upiti);

        const carousel = postaviCarousel(glavniElement, upiti);
    
        if(carousel){
            previous.addEventListener('click', carousel.fnLijevo);
            next.addEventListener('click', carousel.fnDesno);
        }
    });
});