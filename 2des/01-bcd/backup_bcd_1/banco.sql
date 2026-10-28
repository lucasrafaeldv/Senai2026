CREATE TABLE cliente(
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dt_nasc DATE NOT NULL
);

CREATE TABLE produto(
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    produto VARCHAR(100) NOT NULL,
    dt_entrega DATE NOT NULL,
    preco DECIMAL(19,2) NOT NULL,
    qtd INT NOT NULL
);

CREATE TABLE venda(
 id_venda INT PRIMARY KEY AUTO_INCREMENT,
 id_cliente INT NOT NULL, 
 id_produto INT NOT NULL,
 data_entrada DATE NO NULL
);



USE db_senai

INSERT INTO cliente (nome_cliente,email,dt_nasc)
    VALUES("Michael Jackson", "M.jackson@gmail.com","1920-03-22");

INSERT INTO cliente (nome_cliente,email,dt_nasc)
    VALUES("Michael B. Jordan","M.jordan@gmail.com","1967-05-31");

INSERT INTO cliente (nome_cliente,email,dt_nasc)
    VALUES("Michael B. Peter","M.peter@gmail.com","1978-03-31");


USE db_senai;

SELECT * FROM cliente
  
--PRODUTO

INSERT INTO produto(produto,dt_entrega,preco,qtd)
    VALUES ("notebook Dell", "2026-10-23",5.39,100);
    
INSERT INTO produto(produto,dt_entrega,preco,qtd)
    VALUES ("notebook Lenovo", "2026-10-24",5.99,67);

INSERT INTO produto(produto,dt_entrega,preco,qtd)
    VALUES ("notebook Epson", "2026-10-25",5.67,167);


USE db_senai;

SELECT * FROM produto;

--VENDAS
INSERT INTO venda(id_cliente,id_produto,data_entrada)
    VALUES(1,1,"2026-08-17");

INSERT INTO venda(id_cliente,id_produto,data_entrada)
    VALUES(2,2,"2025-09-08");

INSERT INTO venda(id_cliente,id_produto,data_entrada)
    VALUES(3,3,"2024-10-17");

    USE db_senai;
    SELECT * FROM venda


--Criação de Chave Estrangeira (FK)
ALTER TABLE venda
ADD CONSTRAINT fk_venda_cliente
FOREIGN KEY (id_cliente)
REFERENCES cliente (id_cliente);


-- Deletando Linha da Tabela
USE db_senai;
DELETE FROM produto WHERE id_produto = 4;


--Alterar nome do produto na tabela produto 
SELECT FROM produto;
UPDATE produto SET produto = "Bicicleta Gamer" WHERE id_produto 3;


--Atribuir Chave Unica 
ALTER TABLE produto
    ADD CONSTRAINT uk_produto_unico UNIQUE (produto);

ALTER TABLE cliente
    ADD CONSTRAINT uk_email_unico UNIQUE (email);

