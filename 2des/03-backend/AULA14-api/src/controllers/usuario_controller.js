const usuario = require ("../models/usuario_models");

const cadastrar = async (req,res) => {
    //Try significa Tentar
    try{
        const {nome, cpf, email, senha} = req.body;

        let retorno = await usuario.cadastrar(req.body);

        res.json(retorno).status(201).end();

    }catch (err){
        res.json({ erro: err.message }).status(500).end();
    }
};

const listar = async (req,res) => {
    try{
        const usuarios = await usuario.listar();

        res.status (200).json(usuarios).end();
    }catch(err){
        res.status(500).json({erro: err.message}).end();
    }
};

const buscar = async (req,res) => {
    try{
        const id = req.params.id;

        const info = await usuario.buscar(id);

        res.status(200).json(info).end();
    }catch(err){
        res.status(500).json({erro: err.message}).end();
    }
};

const excluir = async (req,res) => {
    try{
        const id = req.params.id;

        const search = await usuario.excluir(id);

        if(search == 0){
            res.status(404).json({info: "Nao foi possivel excluir o usuario"}).end();
        }else{
              res.status(200).json(search).end();
        }
    }catch(err){
        res.status(500).json({erro: err.message}).end();
    }
};

const atualizar = async (req,res) => {
    try{
        const id = req.params.id

        const att = await usuario.atualizar(id);

        res.status(200).json(att).end();
        }catch(err){
            res.status(500).json({erro: err.message}).end();
        }
}; 

module.exports = {
    cadastrar,
    listar,
    buscar,
    excluir,
    atualizar,
};