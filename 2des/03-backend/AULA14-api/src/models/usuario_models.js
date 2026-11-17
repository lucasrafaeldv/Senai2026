const con = require('../config/db.js');

const cadastrar = async ({ nome, cpf, email, senha }) => {
    const [result] = await con.query(
        "INSERT INTO usuarios VALUES (DEFAULT, ?, ?, ?, ? );",
        [nome,cpf,email,senha]
    );
    return{
    id: result.insertId,
    nome: nome,
    cpf: cpf,
    email: email

    
    }};

const listar = async () => {
    const [result] = await con.query(
        "SELECT * FROM usuarios;"
    );
    return result;
};

// Buscando Por Id
const buscar = async (id) => {
    const [result] = await con.query(
        "SELECT id, nome, email FROM usuarios WHERE id = ?;",
        [id]
    );
    return result;
};


//DELETE
const excluir = async (id) => {
    const [result] = await con.query(
        "DELETE FROM usuarios WHERE id = ?;",
        [id]
    );
    return result.affectedRows;
};


//PUT
const atualizar = async (id,dados) => {
   const { nome, cpf, email } = dados;
       const [result] = await con.query(
        "UPDATE usuarios SET nome = ?, cpf = ?, email = ? WHERE id = ?;",
        [nome, cpf, email, id]
    );
    return result;
};


//PATCH
const alterar = async () => {};

module.exports ={
    cadastrar,
    listar,
    buscar,
    excluir,
    atualizar,
    alterar
};