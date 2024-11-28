const dodajCijenuButton = document.getElementById('cijena-dodaj-opseg');
const dodajGodinuButton = document.getElementById("godina-dodaj-opseg");
const resetButton = document.getElementById("reset");
const prikaziButton = document.getElementById("prikazi-histo");

dodajCijenuButton.addEventListener("click", dodajCijenu);
dodajGodinuButton.addEventListener("click", dodajGodinu);
resetButton.addEventListener("click", clearFields);
prikaziButton.addEventListener("click", showHisto);

const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2009.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "toplana",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2003.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 3,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 4,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 5,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 75000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2009,
    datum_objave: "20.08.2013.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 6,
    tip_nekretnine: "Stan",
    naziv: "Stan Novo Sarajevo",
    kvadratura: 20,
    cijena: 125000,
    tip_grijanja: "toplana",
    lokacija: "Centar",
    godina_izgradnje: 2010,
    datum_objave: "20.08.2011.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 7,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "toplana",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2009.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 8,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2001.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 9,
    tip_nekretnine: "Stan",
    naziv: "Stan Alipašino polje",
    kvadratura: 60,
    cijena: 180000,
    tip_grijanja: "toplana",
    lokacija: "Alipašino polje",
    godina_izgradnje: 1985,
    datum_objave: "20.08.1992.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 10,
    tip_nekretnine: "Stan",
    naziv: "Stan Grbavica",
    kvadratura: 100,
    cijena: 375000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2000,
    datum_objave: "20.08.2015.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},]

const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]


const statistikaNekretnina = StatistikaNekretnina();
statistikaNekretnina.init(listaNekretnina, listaKorisnika);

const histogramCijeneData = [];
const histogramGodineData = [];

clearFields(); 

function clearFields() {
    let cijene = document.getElementById("rangovi-cijena");
    let godine = document.getElementById("rangovi-godina");

    while(cijene.firstChild) {
        cijene.removeChild(cijene.firstChild);
    }
    while(godine.firstChild) {
        godine.removeChild(godine.firstChild);
    }

    document.getElementById("cijena-od").value = "";
    document.getElementById("cijena-do").value = "";
    document.getElementById("godina-od").value = "";
    document.getElementById("godina-do").value = "";
    document.getElementById("godine-od").value = "";

    document.getElementById("tip-plin").checked = false;
    document.getElementById("tip-struja").checked = false;
    document.getElementById("tip-toplana").checked = false;

    document.getElementById("histogrami").innerHTML = "";

    console.log("Form cleared.");
    if(histogramCijeneData.length > 0) {
        histogramCijeneData = [];
    }
    if(histogramGodineData.length > 0) {
        histogramGodineData = [];
    }
}

function clearUnosCijene() {
    document.getElementById("cijena-od").value = "";
    document.getElementById("cijena-do").value = "";
}

function clearUnosGodine() {
    document.getElementById("godina-od").value = "";
    document.getElementById("godina-do").value = "";
}

function addLiToUl(div, item) {
    let innerLi = document.createElement("li");
    innerLi.innerHTML = item;
    innerLi.id = "generatedLi";
    div.appendChild(innerLi);
}

function dodajCijenu() {
    let fromInput = document.getElementById('cijena-od');
    let toInput = document.getElementById("cijena-do");
    let from = fromInput.value;
    let to = toInput.value;
    
    if(!from || !to) {
        alert("Morate unijeti cijenu 'od' i cijenu 'do'!");
        clearUnosCijene();
        return;
    }

    if(!(from <= to)) {
        alert("Pogresan unos! Cijena 'od' mora biti manja ili jednaka cijeni 'do'!");
        clearUnosCijene();
        return;
    }
    
    let div = document.getElementById("rangovi-cijena");
    let stringToPut = `${from} - ${to}`;
    addLiToUl(div, stringToPut);
    clearUnosCijene();

    histogramCijeneData.push([from, to]);
}

function dodajGodinu() {
    let fromGodinaInput = document.getElementById("godina-od");
    let toGodinaInput = document.getElementById("godina-do");
    let from = fromGodinaInput.value;
    let to = toGodinaInput.value;
    
    if(!from || !to) {
        alert("Morate unijeti cijenu 'od' i cijenu 'do'!");
        clearUnosGodine();
        return;
    }

    if(!(from <= to)) {
        alert("Pogresan unos! Godina 'od' mora biti manja ili jednaka godini 'do'!");
        clearUnosGodine();
        return;
    }
   
    let div = document.getElementById("rangovi-godina");
    let stringToPut = `${from} - ${to}`;
    addLiToUl(div, stringToPut);
    clearUnosGodine();

    histogramGodineData.push([from, to]);   
}

function drawHistograms(histogram, periodi, rasponiCijena) {
    const histogramContainer = document.getElementById('histogrami');
    histogramContainer.innerHTML = ''; 

    periodi.forEach((period, periodIndex) => {
        const canvas = document.createElement('canvas');
        canvas.id = `graf-canvas-${periodIndex}`;
        histogramContainer.appendChild(canvas);

        const periodData = histogram.filter(item => item.indeksPerioda === periodIndex);

        const labels = rasponiCijena.map(
            (raspon, index) => `${raspon[0]} - ${raspon[1]}`
        );
        const data = Array(rasponiCijena.length).fill(0);
        periodData.forEach(item => {
            data[item.indeksRaspona] = item.brojNekretnina;
        });

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Broj nekretnina (${period.od} - ${period.do})`,
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Histogram: Period (${period.od} - ${period.do})`,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Raspon cijena',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Broj nekretnina',
                        },
                        ticks: {
                            stepSize: 1,
                            padding: 10,
                        },
                        beginAtZero: true,
                    },
                },
            },
        });
    });
}

function showHisto() {
    let periodi = [];
    let rasponiCijena = histogramCijeneData;
    let rasponiGodina = histogramGodineData;

    if(rasponiCijena.length === 0 || rasponiGodina.length === 0) {
        alert("Morate unijeti bar jedan opseg cijena i godina!");
        return;
    }

    for(let i=0; i<rasponiGodina.length; ++i) {
        let from = parseInt(rasponiGodina[i][0]);
        let to = parseInt(rasponiGodina[i][1]);
        periodi.push({od: from, do: to});
    }

    let histogram = statistikaNekretnina.histogramCijena(periodi, rasponiCijena);
    drawHistograms(histogram, periodi, rasponiCijena);
    console.log(histogram);
    console.log("Histogram prikazan!");

}

