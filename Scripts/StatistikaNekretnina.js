function StatistikaNekretnina() {
    var spisakNekretnina = SpisakNekretnina();

    let init = function(listaNekretnina, listaKorisnika) { 
        spisakNekretnina.init(listaNekretnina, listaKorisnika);
    }

    let prosjecnaKvadratura = function(kriterij) {
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let sumaKvadratura = 0;

        listaNekretninaPoKriteriju.forEach(element => {
            let kvadratura = element.kvadratura;
            sumaKvadratura += kvadratura;
        });

        return sumaKvadratura / listaNekretninaPoKriteriju.length;
    }

    let prosjecnaVrijednostSvojstva = function(kriterij, nazivSvojstva) {
        let sumaSvojstva = 0;

        listaNekretnina.forEach(element => {
            let svojstvoValue = element[nazivSvojstva];
            sumaSvojstva += svojstvoValue;
        });

        return sumaSvojstva / listaNekretnina.length;
    }

    let outlier = function(kriterij, nazivSvojstva) {
        let listaNekretninaPoKriteriju = spisakNekretnina.filtrirajNekretnine(kriterij);
        let prosjek = prosjecnaVrijednostSvojstva(kriterij, nazivSvojstva);
        let indexMaxOdstupanja = 0;
        let maxOdstupanje = 0;

        listaNekretninaPoKriteriju.forEach((nekretnina, i) => {
            let odstupanje = Math.abs(nekretnina[nazivSvojstva] - prosjek);
            if (odstupanje > maxOdstupanje) {
                maxOdstupanje = odstupanje;
                indexMaxOdstupanja = i;
            }
        });
    
        return listaNekretninaPoKriteriju[indexMaxOdstupanja];
    }

    let mojeNekretnine = function(korisnik) {
        let listaNekretninaSaUpitomOdKorisnika = listaNekretnina.filter(
            nekretnina => nekretnina.upiti.some(upit => upit.korisnik_id === korisnik));
        
        listaNekretninaSaUpitomOdKorisnika.sort((a, b) => {
            return a.upiti.length > b.upiti.length;
        });

        
        return listaNekretninaSaUpitomOdKorisnika;
    }

    let histogramCijena = function(periodi, rasponiCijena) {
        let histogram = [];

        periodi.forEach((period, indeksPerioda) => {
            rasponiCijena.forEach((rasponCijena, indeksRaspona) => {
                let brojNekretnina = listaNekretnina.filter(nekretnina => {
                    let cijena = nekretnina.cijena;
                    let datumObjave = parseInt(nekretnina.datum_objave.split('.')[2]);
                        return (
                            datumObjave >= period.od && 
                            datumObjave < period.do && 
                            cijena >= rasponCijena[0] && 
                            cijena < rasponCijena[1]
                        );            
                    
                }).length;

                histogram.push({indeksPerioda, indeksRaspona, brojNekretnina});
            
            });   
        });

        return histogram;
    }

    return {
        init: init,
        prosjecnaKvadratura: prosjecnaKvadratura,
        outlier: outlier,
        mojeNekretnine: mojeNekretnine,
        histogramCijena: histogramCijena
    }
}