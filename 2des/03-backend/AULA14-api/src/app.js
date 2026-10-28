// Carrega as variáveis do arquivo .env
require('dotenv').config();

const express = require('express');

const app = express();

// Permite que a API receba JSON no corpo das requisições
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

// Rota não encontrada (404)
// Deve ficar DEPOIS de todas as rotas
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});