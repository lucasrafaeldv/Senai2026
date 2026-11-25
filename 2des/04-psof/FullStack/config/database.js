// Importa o pacote mysql2 com suporte a Promises.
const mysql = require('mysql2/promise');

// Carrega as variaveis de ambiente definidas no arquivo .env.
require('dotenv').config();

// Cria um pool de conexoes para reutilizar conexoes com o MySQL.
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Endereco do servidor MySQL.
    port: Number(process.env.DB_PORT), // Porta do MySQL.
    user: process.env.DB_USER,       // Usuario do banco.
    password: process.env.DB_PASSWORD, // Senha do banco.
    database: process.env.DB_NAME,   // Banco que sera utilizado.
    waitForConnections: true,        // Aguarda uma conexao ficar disponivel.
    connectionLimit: 10,             // Limita a quantidade de conexoes simultaneas.
    queueLimit: 0                    // Sem limite para a fila de requisicoes.
});

// Exporta o pool para que os Models possam executar comandos SQL.
module.exports = pool;