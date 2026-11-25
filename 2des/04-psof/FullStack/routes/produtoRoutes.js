// Importa o Express para criar as rotas da API.
const express = require('express');

// Cria um roteador separado para os endpoints de produtos.
const router = express.Router();

// Importa o Controller que executara cada operacao.
const ProdutoController = require('../controllers/produtoController');

// Associa cada metodo HTTP a sua funcao no Controller.
router.get('/', ProdutoController.listar);          // GET: lista produtos.
router.get('/:id', ProdutoController.buscarPorId); // GET: busca um produto.
router.post('/', ProdutoController.criar);         // POST: insere um produto.
router.put('/:id', ProdutoController.atualizar);   // PUT: atualiza um produto.
router.delete('/:id', ProdutoController.excluir);  // DELETE: remove um produto.

// Exporta as rotas para serem utilizadas pelo servidor principal.
module.exports = router;