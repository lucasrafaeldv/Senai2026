CREATE DATABASE bcd_01;

CREATE TABLE cliente(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE produto(
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    produto VARCHAR(100) NOT NULL,
    preco DECIMAL(19,2) NOT NULL
);

CREATE TABLE venda(
    id_venda INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT NOT NULL,
    id_cliente INT NOT NULL,
    qtd_vendida INT NOT NULL
);

ALTER TABLE venda
ADD CONSTRAINT fk_venda_cliente
FOREIGN KEY (id_cliente)
REFERENCES cliente (id_cliente);

ALTER TABLE venda
ADD CONSTRAINT fk_venda_produto
FOREIGN KEY (id_produto)
REFERENCES produto (id_produto);

USE bcd_01;
ALTER TABLE produto
    ADD CONSTRAINT uk_produto_unico UNIQUE (produto);


--Colocando Dados
USE bcd_01

INSERT INTO cliente (nome,email,telefone)
    VALUES("Michael Jackson", "M.jackson@gmail.com","(19)99018-8840");

INSERT INTO cliente (nome,email,telefone)
    VALUES("Michael B. Jordan","M.jordan@gmail.com","(19)99078-6754");

INSERT INTO cliente (nome,email,telefone)
    VALUES("Michael B. Peter","M.peter@gmail.com","(19)99546-0875");


