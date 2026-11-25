// Carrega as variaveis do arquivo .env antes de iniciar a aplicacao.
require('dotenv').config();

// Importa o Express, responsavel pelo servidor HTTP.
const express = require('express');

// Importa o CORS para permitir requisicoes do Front-end em outra origem.
const cors = require('cors');

// Importa as rotas de produtos.
const produtoRoutes = require('./routes/produtoRoutes');

// Cria a aplicacao Express.
const app = express();

// Permite requisicoes de origens diferentes durante o desenvolvimento.
app.use(cors());

// Permite que o servidor interprete corpos de requisicoes em JSON.
app.use(express.json());

// Disponibiliza os arquivos HTML, CSS e JavaScript da pasta public.
app.use(express.static('public'));

// Define o caminho base da API para todas as rotas de produtos.
app.use('/api/produtos', produtoRoutes);

// Rota simples para verificar se a API esta funcionando.
app.get('/api', (req, res) => {
    res.json({ mensagem: 'API de produtos funcionando!' });
});

// Define a porta pelo .env ou utiliza 3000 como padrao.
const PORT = process.env.PORT || 3000;

// Inicia o servidor e mostra o endereco no terminal.
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});