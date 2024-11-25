const listaKorisnika = Array.from(nekretnine.listaKorisnika);
const listaNekretnina = Array.from(nekretnine.listaNekretnina);

var spisakNekretnina = SpisakNekretnina();

let init = function(listaNekretnina, listaKorisnika) { 
    spisakNekretnina.init(listaNekretnina, listaKorisnika);
}

let prosjecnaKvadratura = function(kriterij) {
    let listaNekretninaPoKriteriju = Array.from(SpisakNekretnina.filtrirajNekretnine(kriterij));
    let sumaKvadratura = 0;

    listaNekretninaPoKriteriju.forEach(element => {
        let kvadratura = element.kvadratura;
        sumaKvadratura += kvadratura;
    });

    return sumaKvadratura / listaNekretninaPoKriteriju.length;
}

let prosjecnaVrijednostSvojstva = function(kriterij, nazivSvojstva) {
    let listaNekretninaPoKriteriju = Array.from(SpisakNekretnina.filtrirajNekretnine(kriterij));
    let sumaSvojstva = 0;

    listaNekretninaPoKriteriju.forEach(element => {
        let svojstvo = listaNekretninaPoKriteriju[nazivSvojstva];
        sumaSvojstva += svojstvo;
    });

    return sumaSvojstva / listaNekretninaPoKriteriju.length;
}

let outlier = function(kriterij, nazivSvojstva) {
    let listaNekretninaPoKriteriju = Array.from(SpisakNekretnina.filtrirajNekretnine(kriterij));
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
