package com.example.endeligoblig3;


// Plain old java object for the tickets, included with an id (invisible for client) that renews automatically:
public class KinoBilletter {
    private int id;
    private String film;
    private String antall;
    private String fornavn;
    private String etternavn;
    private String epost;
    private String telefonnr;

    public KinoBilletter(){
    }

    //husk å legge til ID i () under om id skal fungere!
    public KinoBilletter(int id,String film, String antall, String fornavn, String etternavn, String epost, String telefonnr) {
        this.id=id;
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.epost = epost;
        this.telefonnr=telefonnr;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public String getAntall() {
        return antall;
    }

    public void setAntall(String antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }


}


