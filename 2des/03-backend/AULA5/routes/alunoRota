// Importa o express
const express = require("express");

//Importar o controller do aluno
const alunoController = require("../controller/alunoController");

//criar um sistema de rotas
const router = express.Router();

//Quando alguém acessar o GET /alunos
//Executamos a função listarAlunos do controller.
router.get("/", alunoController.listarAlunos);

//Exportando a rota
module.exports = router;