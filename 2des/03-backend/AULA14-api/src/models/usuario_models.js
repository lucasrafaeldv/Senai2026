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
}};0

const listar = (req,res) => {};


const buscar = (req,res) => {};


//DELETE
const excluir = (req,res) => {};


//PUT
const atualizar = (req,res) => {};


//PATCH
const alterar = (req,res) => {};

module.exports ={
    cadastrar,
    listar,
    buscar,
    excluir,
    atualizar,
    alterar
};