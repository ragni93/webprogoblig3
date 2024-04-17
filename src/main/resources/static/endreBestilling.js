$(function(){
    // Gets the info about the tickets so the user can see what's already chosen:
    const id = window.location.search.substring(1); // Removes the "?" so id=id, not ?id
    const url = "/hentBestilling?" + id; // Corrected URL construction
    console.log("Fetching ticket information from URL:", url); // Log the URL being used for the request
    $.get(url, function(billett){
        console.log("Received ticket information:", billett); // Log the received ticket information
        // Populate form fields with ticket information
        $("#id").val(billett.id);
        $("#film").val(billett.film);
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#epost").val(billett.epost);
        $("#telefonnr").val(billett.telefonnr);
    }).fail(function(xhr, status, error) {
        console.error("Failed to fetch ticket information:", error); // Log any errors that occur during the request
    });
});





function endreBestilling() {
    let valideringsfeil = false;
    const billett = {
        id: $("#id").val(),
        film: $("#valgtFilm").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        epost: $("#epost").val(),
        telefonnr: $("#telefonnr").val()
    };
    console.log("Billett object:", billett); // Log the billett object


    // Validation-check for each input-field

    if (billett.film === "Velg") {
        $("#feilFilm").html("Feil, velg en film.");
        valideringsfeil = true;
    }


    if (isNaN(billett.antall) || billett.antall < 1) {
        $("#feilAntall").html("Feil, velg antall billetter.");
        valideringsfeil = true;
    }

    if (billett.fornavn.trim() === "") {
        $("#feilFornavn").html("Feil, ugyldig fornavn.");
        valideringsfeil = true;
    }

    if (billett.etternavn.trim() === "") {
        $("#feilEtternavn").html("Feil, ugyldig etternavn.");
        valideringsfeil = true;
    }
    if (billett.epost.trim() === "" || !/\S+@\S+\.\S+/.test(billett.epost)) {
        $("#feilEpost").html("Feil, ugyldig eller manglende e-post.");
        valideringsfeil = true;
    }
    if (isNaN(billett.telefonnr) || billett.telefonnr.trim() === "") {
        $("#feilTelefonnr").html("Feil, manglende eller ugyldig telefonnr!");
        valideringsfeil = true;
    }


    // Lets move the object into the server!
    if (!valideringsfeil) {
        $.post("/endreBestilling", billett, function () {
            console.log("POST request sent successfully."); // Log that the POST request was sent
            window.location.href = 'index.html';
        }).fail(function (xhr, status, error) {
            console.error("Failed to send POST request:", error); // Log any errors that occur during the POST request
        });
    }
}


$(function(){
    velgFilm(); // The methods below for showing all available movies are running right away when loading the page
});

function velgFilm(){
    $.get("/hentFilmer", function(data){
        formaterFilmer(data);
    });
}

function formaterFilmer(data){
    let ut="<select id='valgtFilm'>";
    ut += "<option value='' disabled selected>Velg</option>"; //Default choice for the dropdown, if I remove this, the first movie is on the list
    for (const film of data) {
        ut += "<option value='" + film + "'>" + film + "</option>";

    }
    ut+="</select>";
    $("#filmene").html(ut);
}




