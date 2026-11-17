const filmes = require ("../models/filmes_models.js");

const cadastrar = async (req,res) => {
    //Try significa Tentar
    try{
        const {nome, idioma, quantidade} = req.body;

        let retorno = await filmes.cadastrar(req.body);

        res.json(retorno).status(201).end();

    }catch (err){
        res.json({ erro: err.message }).status(500).end();
    }
};

module.exports = {
    cadastrar
}