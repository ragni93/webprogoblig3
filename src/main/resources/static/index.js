
$(function(){
    velgFilm(); // The methods below for showing all available movies are running right away when loading the page
});

$(function(){
    visBilletter(); //I want already bought tickets to always show, if the user should exit the page and re-enter
});

function velgFilm(){
    $.get("/hentFilmer", function(data){
        formaterFilmer(data);
    });
}

function formaterFilmer(data){
    let ut="<select id='valgtFilm'>";
    ut += "<option value='' disabled selected>Velg</option>"; //Default choice for the dropdown
    for (const film of data) {
        ut += "<option value='" + film + "'>" + film + "</option>";

    }
    ut+="</select>";
    $("#filmene").html(ut);
}




// A validation-error boolean to get the if-sentences right, and for the error-messages to disapear when fixed
function bestill() {
    let valideringsfeil = false;
    const billetter = {
        film: $("#valgtFilm").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        epost: $("#epost").val(),
        telefonnr: $("#telefonnr").val()

    };



    // Validation-check for each input-field

    if (billetter.film === "Velg") {
        $("#feilFilm").html("Feil, velg en film.");
        valideringsfeil = true;
    }


    if (isNaN(billetter.antall) || billetter.antall < 1) {
        $("#feilAntall").html("Feil, velg antall billetter.");
        valideringsfeil = true;
    }

    if (billetter.fornavn.trim() === "") {
        $("#feilFornavn").html("Feil, ugyldig fornavn.");
        valideringsfeil = true;
    }

    if (billetter.etternavn.trim() === "") {
        $("#feilEtternavn").html("Feil, ugyldig etternavn.");
        valideringsfeil = true;
    }
    if (billetter.epost.trim() === "" || !/\S+@\S+\.\S+/.test(billetter.epost)) {
        $("#feilEpost").html("Feil, ugyldig eller manglende e-post.");
        valideringsfeil = true;
    }
    if (isNaN(billetter.telefonnr) || billetter.telefonnr.trim() === "") {
        $("#feilTelefonnr").html("Feil, manglende eller ugyldig telefonnr!");
        valideringsfeil = true;
    }


    // Lets move the object into the server!
    if (!valideringsfeil) {
        $.post("/lagre", billetter, function () {
            console.log("Sendte objekt til tjener. ", billetter);
            visBilletter();
        });

        //Empty all input-fields when ticket is ordered and on display
        document.getElementById("valgtFilm").value = "";
        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("epost").value = "";
        document.getElementById("telefonnr").value = "";

    }
}


//in the end of the Bestill-function, the visBilletter-function starts
function visBilletter() {
    $.get("/vis", function(data) {
        formaterData(data);
    })
}

//Formats all the information about tickets, for display on client-side
function formaterData(data) {
    let ut = "<table class='table table-striped table-bordered'>" +
        "<tr>" +
        "<th>Film</th>" +
        "<th>Antall billetter</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Epost</th>" +
        "<th>Telefonnr</th>"
        + "</tr>";
    for (let p of data) {
        ut += "<tr>";
        ut += "<td>" + p.film + "</td>" +
            "<td>" + p.antall + "</td>" +
            "<td>" + p.fornavn + "</td>" +
            "<td>" + p.etternavn + "</td>" +
            "<td>" + p.epost + "</td>" +
            "<td>" + p.telefonnr + "</td>" +
            "<td> <a class='btn btn-primary' href='endreBestilling.html?id="+p.id+"'>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettEnBestilling("+p.id+")'>Slett</button></td>";
    }
    ut += "</tr>";
    $("#visAlleBilletter").html(ut);


    // Removing error-messages when fixed by user
    $("#feilFilm").html("");
    $("#feilAntall").html("");
    $("#feilFornavn").html("");
    $("#feilEtternavn").html("");
    $("#feilEpost").html("");
    $("#feilTelefonnr").html("");


}

function slettEnBestilling(id){
    const url="/slettEnBestilling?id="+id;
    $.get(url, function() {
        window.location.href="/";
    });
}

/*
//Function to choose amount of tickets
function antall(){
    document.getElementById("antall").value;
}
*/

//Function to delete tickets, starting with an alert-message with a warning for the user
function slettBilletter(){
    const ok=confirm("OBS! Alle billettene vil slettes. Er du sikker?");
    if(ok) {
        $.get("/slett", function () {
            visBilletter();
        })
    }

}












