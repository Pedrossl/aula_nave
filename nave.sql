DROP DATABASE nave;
CREATE DATABASE nave;
USE nave;

CREATE TABLE tipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(15) NOT NULL
);

CREATE table naves(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    cor VARCHAR(15) NOT NULL,
    tipo_id INT NOT NULL,
    FOREIGN KEY (tipo_id) REFERENCES tipos(id)
);

INSERT INTO tipos(nome) VALUES ('Nave Mineradora');
INSERT INTO naves(nome,cor,tipo_id) VALUES ('Nave do Grimas', 'Roxa',1);
