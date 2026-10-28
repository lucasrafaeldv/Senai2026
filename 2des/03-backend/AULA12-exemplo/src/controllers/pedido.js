const pedidos = require("../../dados/pedidos.json")

function subotais() {
    pedidos.forEach(p => {
        p.subtotal = p.quantidade * p.preco
    })
}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    subotais()
    res.json(pedidos)
}

const alterar = (req, res) => { 
   const id = req.params.id;
   const dados = req.body; 

   pedidos.forEach((pedido) =>{
    if (pedido.id == id){
        pedido.cliente_id = dados.cliente_id;
        pedido.produto = dados.produto;
        pedido.preco = dados.preco;
        pedido.quantidade = dados.quantidade;
    }
   });
   res.send("pedido alterado com sucesso");
 }
const excluir = (req, res) => {
    id= req.params.id
    
    pedidos.forEach((pedido, indice) => {
        if(pedido.id == id){
            pedidos.splice(indice, 1)
        }
    });
    res.send("cliente excluido com sucesso") }

module.exports = {
    criar, listar, alterar, excluir
}