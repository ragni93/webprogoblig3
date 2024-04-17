CREATE TABLE tabell
(
    id        INTEGER auto_increment not null,
    film      VARCHAR(255) not null,
    antall    INTEGER not null,
    fornavn   VARCHAR(255) not null,
    etternavn VARCHAR(255) not null,
    epost     VARCHAR(255) not null,
    telefonnr VARCHAR(255) not null,
    PRIMARY KEY (id)
);