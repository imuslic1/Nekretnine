const listaKorisnika = nekretnine.listaKorisnika;
const listaNekretnina = nekretnine.listaNekretnina;

var spisakNekretnina = SpisakNekretnina();

let init = function(listaNekretnina, listaKorisnika) { 
    spisakNekretnina.init(listaNekretnina, listaKorisnika);
}

let prosjecnaKvadratura = function(kriterij) {
    let listaNekretninaPoKriteriju = SpisakNekretnina.filtrirajNekretnine(kriterij);
    let sumaKvadratura = 0;

    listaNekretninaPoKriteriju.forEach(element => {
        let kvadratura = element.kvadratura;
        sumaKvadratura += kvadratura;
    });

    return sumaKvadratura / listaNekretninaPoKriteriju.length;
}

let prosjecnaVrijednostSvojstva = function(kriterij, nazivSvojstva) {
    if(!kriterij.isNumber()) return undefined;
    let listaNekretninaPoKriteriju = SpisakNekretnina.filtrirajNekretnine(kriterij);
    let sumaSvojstva = 0;

    listaNekretninaPoKriteriju.forEach(element => {
        let svojstvoValue = element[nazivSvojstva];
        sumaSvojstva += svojstvoValue;
    });

    return sumaSvojstva / listaNekretninaPoKriteriju.length;
}

let outlier = function(kriterij, nazivSvojstva) {
    let listaNekretninaPoKriteriju = SpisakNekretnina.filtrirajNekretnine(kriterij);
    let prosjek = prosjecnaVrijednostSvojstva(kriterij, nazivSvojstva);
    let indexMaxOdstupanja = 0;
    let maxOdstupanje = 0;

    for(let i=0; i<listaNekretninaPoKriteriju.length; ++i) {
        let odstupanje = Math.abs(listaNekretninaPoKriteriju[i][nazivSvojstva] - prosjek);
        if(odstupanje > maxOdstupanje) {
            maxOdstupanje = odstupanje;
            indexMaxOdstupanja = i;
        }
    }

    return listaNekretninaPoKriteriju[indexMaxOdstupanja];
}

let mojeNekretnine = function(korisnik) {
    let listaNekretninaSaUpitomOdKorisnika = listaNekretnina.filter(nekretnina => nekretnina.upiti.some(upit => upit.korisnik_id === korisnik.id));
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