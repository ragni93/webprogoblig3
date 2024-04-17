package com.example.endeligoblig3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.BeanPropertyRowMapper;



//The repository is for connecting to the database
@Repository
public class BillettRepository {

    // Connecting to the database by making a private "db" of the type JdbcTemplate
    @Autowired
    private JdbcTemplate db;


    //This method takes in a ticket, and saves it to the databse
    // the questionmarks will be added with value in the line below
    public void lagreBillett(KinoBilletter innbillett) {
        String sql = "INSERT INTO tabell (film,antall,fornavn,etternavn,epost,telefonnr) VALUES(?,?,?,?,?,?)";
        db.update(sql, innbillett.getFilm(), innbillett.getAntall(), innbillett.getFornavn(), innbillett.getEtternavn(),
                innbillett.getEpost(), innbillett.getTelefonnr());
    }


    // This is where all the tickets will show, and is making a new array called alleBilletter
    public List<KinoBilletter> visBilletter(){
        String sql = "SELECT * FROM tabell order by etternavn"; //tabellen i schema
        List<KinoBilletter> alleBilletter = db.query(sql,new BeanPropertyRowMapper(KinoBilletter.class)); //new list
        return alleBilletter; //returns the new array with all the tickets
    }
    //deleting all the tickets for the database table
    public void slettAlleBilletter(){
        String sql = "DELETE FROM tabell";
        db.update(sql);
    }

    public KinoBilletter hentBestilling (int id){
        String sql="SELECT * FROM TABELL WHERE id=?";
        KinoBilletter enBestilling = db.queryForObject(sql,BeanPropertyRowMapper.newInstance(KinoBilletter.class),id);
        return enBestilling;
    }

    public void endreBestilling(KinoBilletter billett){
        String sql = "UPDATE tabell SET film=?,antall=?,fornavn=?,etternavn=?,epost=?,telefonnr=? where id=?";
        db.update(sql,billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(),
                billett.getEpost(), billett.getTelefonnr(), billett.getId());
    }

    public void slettEnBestilling(int id) {
        String sql = "DELETE FROM tabell WHERE id=?";
        db.update(sql,id);
    }



}


