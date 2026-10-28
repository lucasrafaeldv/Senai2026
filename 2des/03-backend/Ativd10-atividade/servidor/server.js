const express = require('express');
const pedidos = require('../dados.json');

//Usa o GET para Mostrar e puxar id
const mostrarPedido = (req,res) => {0
    caucularSubtotais()
    res.send(pedidos);
}

//Calcula Subtotais dos Dados e colocando a respostas Com GET
const caucularSubtotais = (req,res)=>{
    pedidos.forEach ( p => {
        p.subtotal = p.precoUnitario * p.quantidade;
    });
}

//Cria novos pedidos via POST
const novoPedido = (req,res) => {
    if(req.body){
        res.send("Pedido recebido");
        pedidos.push(req.body)
    }else{
        res.send("Erro ao receber pedido");
    }
}

//Exclui pedido por ID via func: DELETE.
const excluirPedido = (req,res) => {
    const id = req.params.id;

    pedidos.forEach((pedido, indice) => {
        if(pedido.id == id){
            pedidos.splice(indice, 1);
        }
    });

    res.send("Pedido Excluido com sucesso!");
}

//Alterar produto via PUT e passo o ID.
const alterarPedido = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    pedidos.forEach((pedido) => {
        if(pedido.id == id) {
            pedido.nome = dados.nome;
            pedido.precoUnitario = dados.precoUnitario;
            pedido.quantidade = dados.quantidade;
            pedido.unidade = dados.unidade
        }
    });

    res.send("Pedido atulizado com sucesso");
};



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const porta = 3000;

//ROTAS
app.get("/", mostrarPedido);
app.post("/", novoPedido);
app.delete("/:id", excluirPedido);
app.put("/:id", alterarPedido);

app.listen(porta, () => {
    console.log(`Servidor: http://127.0.0.1:${porta}`)
});