const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    function ajaxRequest(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback({ status: xhr.status, statusText: xhr.statusText }, null);
                }
            }
        };
        xhr.send(data ? JSON.stringify(data) : null);
    }

    // vraća korisnika koji je trenutno prijavljen na sistem
    async function impl_getKorisnik(fnCallback) {
        let ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    console.log('Uspješan zahtjev, status 200');
                    fnCallback(null, JSON.parse(ajax.responseText));
                } else if (ajax.status == 401) {
                    console.log('Neuspješan zahtjev, status 401');
                    fnCallback("error", null);
                } else {
                    console.log('Nepoznat status:', ajax.status);
                }
            }
        };

        ajax.open("GET", "http://localhost:3000/korisnik/", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
    }

    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, ajax.response)
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                console.log("Response", ajax.responseText);
                fnCallback(ajax.responseText, null)
            }
        }
        ajax.open("PUT", "http://localhost:3000/korisnik", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        let korisnik = {
            "ime": noviPodaci.ime,
            "prezime": noviPodaci.prezime,
            "username": noviPodaci.username,
            "password": noviPodaci.password,
        }
        forSend = JSON.stringify(korisnik)
        ajax.send(forSend)
        
        fnCallback(null, { poruka: 'Podaci su uspješno ažurirani' });
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, ajax.response)
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                console.log("Response", ajax.responseText);
                fnCallback(ajax.responseText, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/upit", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        let upit = {
            "nekretnina_id": nekretnina_id,
            "tekst_upita": tekst_upita
        }
        forSend = JSON.stringify(upit)
        ajax.send(forSend)

        fnCallback(null, { poruka: 'Upit je uspješno dodan' });
    }

    function impl_getNekretnine(fnCallback) {
        // Koristimo AJAX poziv da bismo dohvatili podatke s servera
        ajaxRequest('GET', '/nekretnine', null, (error, data) => {
            // Ako se dogodi greška pri dohvaćanju podataka, proslijedi grešku kroz callback
            if (error) {
                fnCallback(error, null);
            } else {
                // Ako su podaci uspješno dohvaćeni, parsiraj JSON i proslijedi ih kroz callback
                try {
                    const nekretnine = JSON.parse(data);
                    fnCallback(null, nekretnine);
                } catch (parseError) {
                    // Ako se dogodi greška pri parsiranju JSON-a, proslijedi grešku kroz callback
                    fnCallback(parseError, null);
                }
            }
        });
    }

    function impl_postLogin(username, password, fnCallback) {
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, ajax.response)
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                console.log("Response", ajax.responseText);
                fnCallback(ajax.responseText, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/login", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        var objekat = {
            "username": username,
            "password": password
        }
        forSend = JSON.stringify(objekat)
        ajax.send(forSend)
    }

    function impl_postLogout(fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, ajax.response)
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/logout", true)
        ajax.send()
    }

    function getTop5Nekretnina(lokacija, fncallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fncallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fncallback(ajax.statusText, null)
            }
        }
        ajax.open("GET", `http://localhost:3000/nekretnine/top5?lokacija=${lokacija}`, true)
        ajax.send()
    }

    function getMojiUpiti(fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("GET", "http://localhost:3000/upiti/moji", true)
        ajax.send()
    }

    function getNekretnina(nekretnina_id, fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("GET", `http://localhost:3000/nekretnina/${nekretnina_id}`, true)
        ajax.send()
    }

    function getNextUpiti(nekretnina_id, page, fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        //console.log("pozvan next upiti");
        ajax.open("GET", `http://localhost:3000/next/upiti/nekretnina/${nekretnina_id}?page=${page}`, true)
        ajax.send()
    }

    function postNekretninaZahtjev(nekretnina_id, tekst, trazeni_datum, fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("POST", `http://localhost:3000/nekretnina/${nekretnina_id}/zahtjev`, true)
        ajax.setRequestHeader("Content-Type", "application/json")
        let zahtjev = {
            "tekst": tekst,
            "trazeniDatum": trazeni_datum
        }
        ajax.send(JSON.stringify(zahtjev));
        console.log("Zahtjev poslan");

        fnCallback(null, { poruka: 'Zahtjev je uspješno dodan' });
    }

    function putZahtjevModify(zahtjev_id, nekretnina_id, addToTekst=null, odobren, fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("PUT", `http://localhost:3000/nekretnina/${nekretnina_id}/zahtjev/${zahtjev_id}`, true)
        ajax.setRequestHeader("Content-Type", "application/json")
        let izmjena = {
            odobren: odobren,
            addToTekst: addToTekst,
        }
        ajax.send(JSON.stringify(izmjena));

        fnCallback(null, { poruka: 'Zahtjev je uspješno ažuriran' });
    }

    function impl_getInteresovanja(id_nekretnine, fnCallback) {
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText))
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                fnCallback(ajax.statusText, null)
            }
        }
        ajax.open("GET", `http://localhost:3000/nekretnina/${id_nekretnine}/interesovanja`, true)
        ajax.send()
    }

    function postNekretninaPonuda(nekretnina_id, tekst, cijenaPonude, datumPonude, idVezanePonude = null, odbijenaPonuda, fnCallback){
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, ajax.response)
            }
            else if (ajax.readyState == 4) {
                //desio se neki error
                console.log("Response", ajax.responseText);
                fnCallback(ajax.responseText, null)
            }
        }
        ajax.open("POST", `http://localhost:3000/nekretnina/${nekretnina_id}/ponuda`, true)
        ajax.setRequestHeader("Content-Type", "application/json")

        let ponuda = {}

        if(!idVezanePonude){
            ponuda = {
                "tekst": tekst,
                "cijenaPonude": cijenaPonude,
                "datumPonude": datumPonude,
                "odbijenaPonuda": odbijenaPonuda || null
            }    
        } else {
            ponuda = {
                "tekst": tekst,
                "cijenaPonude": cijenaPonude,
                "datumPonude": datumPonude,
                "idVezanePonude": idVezanePonude,
                "odbijenaPonuda": odbijenaPonuda || null
            }
        }

        forSend = JSON.stringify(ponuda)
        ajax.send(forSend)

        fnCallback(null, { poruka: 'Ponuda je uspjesno dodana' });
    }



    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getTop5Nekretnina: getTop5Nekretnina,
        getMojiUpiti: getMojiUpiti,
        getNekretnina: getNekretnina,
        getNextUpiti: getNextUpiti,
        getInteresovanja: impl_getInteresovanja,
        postNekretninaZahtjev: postNekretninaZahtjev,
        putZahtjevModify: putZahtjevModify,
        postNekretninaPonuda: postNekretninaPonuda
    };
})();