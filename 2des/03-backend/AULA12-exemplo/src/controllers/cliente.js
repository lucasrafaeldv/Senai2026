const clientes = require("../../dados/clientes.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1].id) + 1 //autoIncrement
    clientes.push(dados)
    res.status(201).json(dados)
}


const listar = (req, res) => {
    res.json(clientes)
}


const alterar = (req, res) => {
    const id = req.params.id;
    dados = req.body; 

   clientes.forEach((clientes) =>{
    if (clientes.id == id){
        clientes.cpf = dados.cpf;
        clientes.nome = dados.nome;
    }
});
   res.send("cliente alterado com sucesso");
 } 


const excluir = (req, res) => { 
    id= req.params.id
    
    clientes.forEach((cliente, indice) => {
        if(cliente.id == id){
            clientes.splice(indice, 1)
        }
    });
    res.send("cliente excluido com sucesso")
 }

module.exports = {
    criar, listar, alterar, excluir
}