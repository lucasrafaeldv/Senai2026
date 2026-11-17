// Pagamos o formulário pelo ID
const formulario = document.getElementById("formPedido");

//Adicionando um evento ao formulário
//o evento acontece quando o usuário clicar em "finalizar pedido"
formulario.addEventListener("submit", function(event){
    //Impedir que a página seja recarregada
    event.preventDefault();

    //Pegando os dados digitados pelo usuárioz  
    const nome = document.getElementById("nome").value;

    //pegando o preço do lanche selecionado
    //O value padrão o option é um String
    //Temos que converter para Number() para virar um número
    const precoLanche = Number(document.getElementById("lanche").value);
    
    //pegando a quantidade
    const quantidade = Number(document.getElementById("quantidade").value);

    //pegando o preço da bebida
    const precoBebida = Number(document.getElementById("bebida").value);

    //Calculando o preço do pedido

    const totalLanche = precoLanche * quantidade;

    //Calculando o preço dos lanches + bebida
    const subtotal = totalLanche + precoBebida;

    //Verificando se tem desconto
    //iniciando uma variavel chamada desconto com ZERO;
    let desconto = 0;

    //Verificando se o subtotal é maior OU igual a 50
    if (subtotal >= 50){
        desconto = subtotal * 0.10;
    }

    //subtraindo o valor do desconto e calculando o valor total do pedido
    const total = subtotal - desconto;

    //Monstrando o resultado

    //pegando a div onde o resultado será mostrado;
    const resultado = document.getElementById("resultado");

    //Colocando informações dentro da DIV
    resultado.innerHTML =  `
        <h2>Pedido realizado</h2>

        <p><strong>Cliente: </strong> ${nome}</p>

        <p><strong>Quantidade de lanches: </strong>${quantidade} </p>

        <p><strong>Desconto: </strong> R$ ${desconto.toFixed(2)} </p>

        <h3> Total: R$ ${total.toFixed(2)}</h3>
    `;
});