const con = require('../config/db.js');

const cadastrar = async ({nome,idioma,quantidade}) =>{
     const [result] = await con.query(
        "INSERT INTO filmes VALUES (DEFAULT ,? , ?, ?);",
     );
     return{
    id: result.insertId,
    nome: nome,
    idioma: idioma,
    quantidade: quantidade
    
    }};
    module.exports ={
    cadastrar
};