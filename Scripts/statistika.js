const dodajCijenuButton = document.getElementById('cijena-dodaj-opseg');
const dodajGodinuButton = document.getElementById("godina-dodaj-opseg");
const resetButton = document.getElementById("reset");
const prikaziButton = document.getElementById("prikazi-histo");

dodajCijenuButton.addEventListener("click", dodajCijenu);
dodajGodinuButton.addEventListener("click", dodajGodinu);
resetButton.addEventListener("click", clearFields);
prikaziButton.addEventListener("click", showHisto);

const histogramData = {}

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

    //location.reload();

    console.log("Form cleared.");
    histogramData = {};
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
   
}

function showHisto() {


}



