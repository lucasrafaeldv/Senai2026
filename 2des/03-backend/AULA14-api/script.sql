DROP DATABASE IF EXISTS locadora;
CREATE DATABASE locadora;

USE locadora;

CREATE TABLE usuarios(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE filmes(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL UNIQUE,
    idioma VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL
);

--DEFALT seria um campo prechindo automatico com informacao seguinte
--TIMESTAMP  (data e hora)
--CURRENT_TIMESTAMP 

CREATE TABLE locacoes(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    data_locacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP NULL,
    id_filme INT,
    id_usuario INT,
    CONSTRAINT fk_filmes_locacoes FOREIGN KEY (id_filme) REFERENCES filmes(id)
    CONSTRAINT fk_usuarios_locacoes FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

INSERT INTO usuarios VALUES 
(DEFAULT, "Fulano da Silva","123.456.789.00", "fulano@email.com", "1234"),
(DEFAULT, "Ciclano da Silva","364.908.768.09", "ciclano@email.com", "4321");

INSERT INTO filmes VALUES
(DEFAULT, "Matrix", "Portugues",3),
(DEFAULT, "It", "Inglês",2);

INSERT INTO locacoes (id_usuario, id_filme) VALUES
(2, 1);