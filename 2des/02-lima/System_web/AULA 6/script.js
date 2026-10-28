const produto = document.getElementById("produto");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");

const botao = document.getElementById("botAdd");

const listaProdutos = document.getElementById("listaProdutos")

const total = document.getElementById("total");

let valorTotal = 0;

botao.addEventListener("click", function(){

    //Pegando os Valores Digitados
    const nomeProduto = produto.value;

    const valorProduto = parseFloat(preco.value);

    const qtd = parseInt(quantidade.value);

    //Verificando se os campos foram preenchidos
    if(nomeProduto === "" || isNaN(valorProduto) || isNaN(qtd)){
        alert("Preencha todos os campos!");

        return;
    }

    //Calculando o valor do produto
    const subtotal = valorProduto * qtd;

    //soamndo ao total
    valorTotal = valorTotal + subtotal

    //Criando um Novo elemento
    const item = document.createElement("li")

    //Colocando informações dentro do <li>
    item.textContent = `${nomeProduto} - ${qtd} - R$ ${subtotal.toFixed(2)}`;

    //adicionando o item na lista 
    listaProdutos.appendChild(item);

    total.textContent = `R$ ${valorTotal.toFixed(2)}`;

    //limpando os campos 
    produto.value ="";
    preco.value ="";
    quantidade.value = 1;

});