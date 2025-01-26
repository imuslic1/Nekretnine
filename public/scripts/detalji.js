function getNekretninaIdFromUrl() {
    const params = new URLSearchParams(window.location.search); // Uzima parametre iz URL-a
    return params.get('id'); // Vraća vrijednost parametra `id`
}

document.addEventListener('DOMContentLoaded', async () => {
    const glavniElement = document.getElementById('upiti');
    const glavniElementZahtjevi = document.getElementById('zahtjevi');
    const glavniElementPonude = document.getElementById('ponude');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const previousButtonZahtjevi = document.getElementById('previous-zahtjevi');
    const nextButtonZahtjevi = document.getElementById('next-zahtjevi');
    const previousButtonPonude = document.getElementById('previous-ponude');
    const nextButtonPonude = document.getElementById('next-ponude');
    const interesovanja = document.getElementById('interesovanja');

    const idNekretnine = getNekretninaIdFromUrl();
    let upiti = [];
    
    PoziviAjax.getKorisnik((error, korisnik) => {
        if(error) {
            console.error(error);
            //return;
        }
        
        PoziviAjax.getNekretnina(idNekretnine, (error, data) =>{
            if(error){
                document.getElementById('osnovno').innerHTML = `<div class="error"><p>Došlo je do greške.</p>`;
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
    
            PoziviAjax.getInteresovanja(idNekretnine, (error, data) => {
                if(error){
                    interesovanja.innerHTML = `<div class="error"><p>Došlo je do greške.</p>`;
                    return;
                }
        
                upiti = data.upiti;
                zahtjevi = data.zahtjevi;
                ponude = data.ponude;
    
                //upiti
                if(upiti.length == 0){
                    document.getElementById("upiti").innerHTML = `<div class="error"><p>Nema postavljenih upita za ovu nekretninu.</p>`;
                    previousButton.style.display = 'none';
                    nextButton.style.display = 'none';
                }
                else if(upiti.length == 1){
                    glavniElement.innerHTML = `
                        <div class="upit">
                            <p><strong>Id korisnika: </strong>${upiti[0].korisnikId}</p>
                            <p><strong>Id upita: </strong>${upiti[0].id}</p>
                            <p><strong>Tekst upita: </strong>${upiti[0].tekst}</p>
                        </div>
                    `;
                    previousButton.style.display = 'none';
                    nextButton.style.display = 'none';
                }
                else{
                    //mora tu jer inace se zavrsi prije nego se dobave upiti
                    const carousel = postaviCarousel(glavniElement, upiti);
    
                    if(carousel){
                        previousButton.addEventListener('click', carousel.fnLijevo);
                        nextButton.addEventListener('click', carousel.fnDesno);
                    }
                }
    
                //zahtjevi
                if(!zahtjevi) {
                    console.log(data);
                    document.getElementById("zahtjevi").style.display = 'none';
                    document.getElementById("zahtjevi-naslov").style.display = 'none';
                    document.getElementById("buttons-zahtjevi").style.display = 'none';
                }
                else {
                    if(zahtjevi.length == 0){
                        document.getElementById("zahtjevi").innerHTML = `<div class="error"><p>Nema postavljenih zahtjeva za ovu nekretninu.</p>`;
                        previousButtonZahtjevi.style.display = 'none';
                        nextButtonZahtjevi.style.display = 'none';
                    }
                    else if(zahtjevi.length == 1){
                        let status = zahtjevi[0].odobren ? "odobren" : "odbijen";
                        if(zahtjevi[0].odobren == null){
                            status = "na čekanju";
                        }
                        glavniElementZahtjevi.innerHTML = `
                            <div class="zahtjev">
                            <strong>Korisnik ${zahtjevi[0].korisnikId}<br><br></strong>
                            <strong>Zahtjev ${zahtjevi[0].id}</strong>
                            <p>${zahtjevi[0].tekst}</p>
                            <p>Datum zahtjeva: ${zahtjevi[0].trazeniDatum}</p>
                            <p>Status zahtjeva: ${status}</p>`;
                    
                        previousButtonZahtjevi.style.display = 'none';
                        nextButtonZahtjevi.style.display = 'none';
                    }
                    else{
                        //mora tu jer inace se zavrsi prije nego se dobave zahtjevi
                        const carouselZahtjevi = postaviCarouselZahtjeva(glavniElementZahtjevi, zahtjevi);
            
                        if(carouselZahtjevi){
                            previousButtonZahtjevi.addEventListener('click', carouselZahtjevi.fnLijevoZahtjev);
                            nextButtonZahtjevi.addEventListener('click', carouselZahtjevi.fnDesnoZahtjev);
                        }
                    }
                }
                
                //ponude
                if(ponude.length == 0){
                    document.getElementById("ponude").innerHTML = `<div class="error"><p>Nema postavljenih ponuda za ovu nekretninu.</p>`;
                    previousButtonPonude.style.display = 'none';
                    nextButtonPonude.style.display = 'none';
                }
                else if(ponude.length == 1){
                    let status = ponude[0].odbijenaPonuda ? "odbijena" : "odobrena";
                    if(ponude[0].odbijenaPonuda == null){
                        status = "na čekanju";
                    }
    
                    let cijena = ponude[0].cijenaPonude;
                    if(cijena) {
                        glavniElementPonude.innerHTML = `
                        <div class="ponuda">
                            <strong>Korisnik ${ponude[0].korisnikId}<br><br></strong>
                            <strong>Ponuda ${ponude[0].id}</strong>
                            <p>${ponude[0].tekst}</p>
                            <p>Status ponude: ${status}</p>
                            <p>Cijena ponude: ${cijena}</p>
                        </div>`;
                    } else {
                        glavniElement.innerHTML = `
                        <div class="ponuda">
                            <strong>Korisnik ${ponude[0].korisnikId}<br><br></strong>
                            <strong>Ponuda ${ponude[0].id}</strong>
                            <p>${ponude[0].tekst}</p>
                            <p>Status ponude: ${status}</p>
                        </div>`;
                    }
    
                    
                    previousButtonPonude.style.display = 'none';
                    nextButtonPonude.style.display = 'none';
                }
                else{
                    //mora tu jer inace se zavrsi prije nego se dobave zahtjevi
                    const carouselPonude = postaviCarouselPonuda(glavniElementPonude, ponude);
        
                    if(carouselPonude){
                        previousButtonPonude.addEventListener('click', carouselPonude.fnLijevoPonuda);
                        nextButtonPonude.addEventListener('click', carouselPonude.fnDesnoPonuda);
                    }
                }
            });
    
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
    
            document.getElementById('tipInteresovanja').addEventListener('change', (event) => {
                const tipInteresovanja = event.target.value;
                
                const allFields = [
                    'zahtjev-div',
                    'ponuda-div'
                ];
                allFields.forEach(field => {
                    document.getElementById(field).style.display = 'none';
                });
    
                const poljaId = {
                    'zahtjev': 'zahtjev-div',
                    'ponuda': 'ponuda-div'
                }[tipInteresovanja];
    
                if(poljaId){
                    document.getElementById(poljaId).style.display = 'block';
                }
    
                if(tipInteresovanja === 'ponuda'){
                    setTimeout(() => {popuniDropdownVezanaNekretnina('vezanaPonuda');}, 150);
                }
            });
            document.getElementById('tipInteresovanja').dispatchEvent(new Event('change'));
    
            function popuniDropdownVezanaNekretnina(idDropdown) {
                const dropdown = document.getElementById(idDropdown);
            
                if (!dropdown) {
                    console.error(`Element sa ID '${idDropdown}' nije pronađen.`);
                    return;
                }
            
                const praznaOpcija = document.createElement("option");
                praznaOpcija.value = null;
                praznaOpcija.textContent = "Nova korijenska ponuda";
                dropdown.appendChild(praznaOpcija);
    
                let brojac = 0;
            
                ponude.forEach(ponuda => {
                    const opcija = document.createElement("option");
                    if(ponuda.cijenaPonude && !ponuda.odbijenaPonuda){
                        opcija.value = ponuda.id;
                        opcija.textContent = `${ponuda.id}`;
                        brojac++;
                    }
                    dropdown.appendChild(opcija);
                });
                if(brojac == 0){
                    praznaOpcija.textContent = "Nema dostupnih ponuda";
                    praznaOpcija.disabled = true;
                    return;
                }
            }
    
            
            
            document.getElementById('forma-interesovanje').addEventListener('submit', (event) => {
                event.preventDefault();
            
                const tip = document.getElementById('tipInteresovanja').value;            
    
                if(tip === 'upit'){
                    const tekst = document.getElementById('tekst').value;
                    if(!tekst){
                        alert('Unesite tekst upita!');
                        return;
                    }
                    PoziviAjax.postUpit(idNekretnine, tekst, (error, response) => {
                        if (error) {
                            alert('Greška prilikom dodavanja upita.');
                            return;
                        }
                        console.log('Upit uspješno postavljen!');
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 5);
                }
    
                else if(tip === 'zahtjev'){
                    const tekst = document.getElementById('tekst').value;
                    const trazeniDatum = document.getElementById('trazeniDatum').value;
                    if(!tekst || !trazeniDatum){
                        alert('Unesite tekst zahtjeva i datum!');
                        return;
                    }
                    PoziviAjax.postNekretninaZahtjev(idNekretnine, tekst, trazeniDatum, (error, response) => {
                        if (error) {
                            alert('Greška prilikom dodavanja zahtjeva.');
                            return;
                        }
                        console.log('Zahtjev uspješno postavljen!');
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 5);
                }
    
    
                else{
                    const tekst = document.getElementById('tekst').value;
                    const vezanaPonuda = Number(document.getElementById('vezanaPonuda').value);
                    const cijenaPonude = document.getElementById('cijenaPonude').value;
                    if(!tekst || !cijenaPonude){
                        alert('Unesite tekst ponude i cijenu poruke!');
                        return;
                    }
                    PoziviAjax.postNekretninaPonuda(idNekretnine, tekst, cijenaPonude, new Date(), vezanaPonuda, null, (error, response) => {
                        if (error) {
                            alert('Greška prilikom dodavanja ponude.');
                            return;
                        }
                        console.log('Ponuda uspješno postavljena!');
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 5);
                }
            });
    
            
    
            return data;
    
        });
        
    });

   
});