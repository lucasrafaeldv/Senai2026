// Importa o Express para o nosso projeto
const express = require("express");

//importa nossa de rota de alunos
const alunoRota = require("./routes/alunoRota");
const professorRota = require("./routes/professorRota");

//Cria a aplicação do Express.
const app = express();

//define a porta que o servidor vai utilizar
const porta = 3000;

app.use("/alunos", alunoRota);
app.use("/professor", professorRota);

//Cria uma rota para a página inicial
app.get("/", (req, res) => {
    //Envia uma mensagem pro meu navegador, pra ver se funcionando.
    res.send("Olá Mundão de meu Deus!");
});

//Iniciar o meu servidor
app.listen(porta, () => {
    console.log("Servidor funcionando!");
});