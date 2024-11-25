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