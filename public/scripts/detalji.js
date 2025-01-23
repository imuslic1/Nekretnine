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
        document.getElementById('lokacija').innerHTML = `<strong> Lokacija: </strong> <a href=# id=link-lokacija>${data.lokacija}`; //ubaci link
        document.getElementById('godina-izgradnje').innerHTML = `<strong> Godina izgradnje: </strong> ${data.godina_izgradnje}`;
        document.getElementById('datum-objave').innerHTML = `<strong> Datum objave: </strong> ${data.datum_objave.slice(-5,-1)}`;
        document.getElementById('opis').innerHTML = `<strong> Opis: </strong> <p>${data.opis}</p>`;

        upiti = data.upiti;
        if(upiti.length == 0) {
            glavniElement.innerHTML = `<div class="error"><p>Trenutno nema upita za ovu nekretninu.</p></div>`;
        }
        console.log("Upiti pri pozivu", upiti);

        const carousel = postaviCarousel(glavniElement, upiti);
    
        if(carousel){
            previous.addEventListener('click', carousel.fnLijevo);
            next.addEventListener('click', carousel.fnDesno);
        }

        // Lokacija link
        document.getElementById('link-lokacija').addEventListener('click', (error) => {
            error.preventDefault();
            const lokacija = data.lokacija;
    
            PoziviAjax.getTop5Nekretnina(lokacija, (err, nekretnine) => {
                if (err) {
                    console.error('Greška prilikom dohvatanja top 5 nekretnina:', err);
                    return;
                }
                
                document.getElementById('top5-naslov').style.display = 'block';

                const top5Div = document.getElementById('top5-nekretnina');
                let prikaz = "";
                nekretnine.forEach(nekretnina => {
                    prikaz += `
                        <div class="nekretnina">
                            <h3>${nekretnina.naziv}</h3>
                            <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
                            <p>Cijena: ${nekretnina.cijena} BAM</p>
                            <a href="detalji.html?id=${nekretnina.id}" class="detalji-dugme">Detalji</a>
                        </div>
                    `;
                });
                top5Div.innerHTML = prikaz;
            });
        });
    });
});