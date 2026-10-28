const express = require("express");
const cors = require("cors");

//Colocar o caminho das minhas rotas.
const routes = require("./src/routes")

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Utilizar os Routes do express.
app.use(routes);

const porta = 3000;

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})