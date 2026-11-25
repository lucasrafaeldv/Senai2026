// Importa o pool de conexoes com o MySQL.
const db = require('../config/database');

// Define as consultas SQL relacionadas a produtos.
const ProdutoModel = {
    // Busca todos os produtos cadastrados (SELECT).
    async listarTodos() {
        const [linhas] = await db.query(
            'SELECT id, nome, descricao, preco, criado_em FROM produtos ORDER BY id DESC'
        );
        return linhas; // Devolve a lista encontrada.
    },

    // Busca um produto pelo identificador (SELECT com WHERE).
    async buscarPorId(id) {
        const [linhas] = await db.query(
            'SELECT id, nome, descricao, preco, criado_em FROM produtos WHERE id = ?',
            [id] // O ? recebe o valor de id com seguranca.
        );
        return linhas[0]; // Retorna o primeiro resultado ou undefined.
    },

    // Cadastra um novo produto (INSERT).
    async criar(produto) {
        const { nome, descricao, preco } = produto; // Extrai os dados recebidos.
        const [resultado] = await db.query(
            'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
            [nome, descricao || null, preco] // Envia os valores separadamente do SQL.
        );
        return resultado.insertId; // Retorna o ID gerado pelo MySQL.
    },

    // Atualiza os dados de um produto existente (UPDATE).
    async atualizar(id, produto) {
        const { nome, descricao, preco } = produto; // Extrai os novos dados.
        const [resultado] = await db.query(
            'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
            [nome, descricao || null, preco, id] // Define os valores e o produto alvo.
        );
        return resultado.affectedRows; // Informa quantas linhas foram alteradas.
    },

    // Exclui um produto pelo ID (DELETE).
    async excluir(id) {
        const [resultado] = await db.query(
            'DELETE FROM produtos WHERE id = ?',
            [id] // Identifica qual produto sera excluido.
        );
        return resultado.affectedRows; // Informa quantas linhas foram removidas.
    }
};

// Disponibiliza as funcoes para o Controller.
module.exports = ProdutoModel;