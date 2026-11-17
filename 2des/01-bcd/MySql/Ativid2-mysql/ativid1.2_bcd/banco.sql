CREATE DATABASE biblioteca;

CREATE TABLE aluno(
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    curso_aluno VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
);

CREATE TABLE emprestimo(
    id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT NOT NULL,
    id_livro INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL
);

CREATE TABLE livro(
    id_livro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano_publicacao INT(4) NOT NULL,
);


--Inserindo dados na table aluno
INSERT INTO aluno (nome,curso_aluno,email)
    VALUES("Lucas Dwaine","Quimica","contafake6969@gmail.com")

INSERT INTO aluno (nome,curso_aluno,email)
    VALUES("Homicidio da Silva","Psicologia","homicidiosilva@gmail.com")

INSERT INTO aluno (nome,curso_aluno,email)
    VALUES("Lusquinhas Pirado","Desenvolvimento de Sistemas","soumaluco123@gmail.com@gmail.com")


--Inserindo dados table livro
INSERT INTO livro (titulo,autor,ano_publicacao)
    VALUES("Em Busca do Sonho", "Eu Mesmo","2023");

INSERT INTO livro (titulo,autor,ano_publicacao)
    VALUES("Michael Jackson", "Ele Mesmo","2008");

INSERT INTO livro (titulo,autor,ano_publicacao)
    VALUES("Habitos Hatomicos", "Frank Ocean","1950");

--Inserindo dados na table emprestimo
INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao)
    values(1, 1, "2023-06-01", "2023-06-15");

INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao)
    values(2, 2, "2023-06-31", "2023-07-30");

INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao)
    values(3, 3, "2023-09-31", "2023-10-30");  

--Aplicando as chaves estrangeiras
ALTER TABLE emprestimo
ADD CONSTRAINT fk_emprestimo_aluno
FOREIGN KEY (id_aluno)
REFERENCES aluno (id_aluno);

ALTER TABLE emprestimo
ADD CONSTRAINT fk_emprestimo_livro
FOREIGN KEY (id_livro)
REFERENCES livro (id_livro);

--Atribuindo a chave unica 
USE bcd_01;
ALTER TABLE aluno
    ADD CONSTRAINT uk_email_unico UNIQUE (email);
