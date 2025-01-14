window.onload =function(){
    var username=document.getElementById("username")
    var password=document.getElementById("password")
    
    let dugme=document.getElementById("dugme")
    
    dugme.onclick = function(){
        
        PoziviAjax.postLogin(username.value, password.value, function(err,data){
            if(err != null){
                const errorResponse = JSON.parse(err);
                if(errorResponse.greska && errorResponse.greska.includes("Pokusajte ponovo za")){
                    var divElement=document.getElementById("areaBelow");
                    divElement.innerHTML=`<h2>${JSON.parse(err).greska}</h2>`;
                }

                window.alert(errorResponse.greska || "Doslo je do greske prilikom prijave.");
            } else {
                var message = JSON.parse(data)
                if(message.poruka == "Neuspješna prijava"){
                    var divElement = document.getElementById("areaBelow")
                    divElement.innerHTML = "<h2>Neispravni podaci</h2>"
                } else {
                    window.location.href="http://localhost:3000/nekretnine.html"
                }
            }
        })
    }
}