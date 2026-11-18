const formProduto = document.getElementById("formProduto");
const precoCusto = document.getElementById("precoCusto");
const precoVenda = document.getElementById("precoVenda");
const margemLucro = document.getElementById("margemLucro");
const mensagemProduto = document.getElementById("mensagemProduto");

function calcularMargem(){
    const custo = Number(precoCusto.value);
    const venda = Number(precoVenda.value);

    if (precoCusto.value === "" ||
        precoVenda.value === "" ||
        custo <= 0 ||
        venda < 0 ) {
            margemLucro.value = "-";
            return;
    }

    const margem = ((venda - custo) / custo) * 100;

    //Converte o número em uma representação de texto seguindo as conversões brasileiras.
    margemLucro.value = margem.toLocaleString("pt-BR", {
        //define que o número deve ter pelo menos duas cadas decimais.
        minimumFractionDigits: 2,
        //define que o número deve ter no máximo duas casas decimais.
        maximumFractionDigits: 2
    }) + "%";
}

precoCusto.addEventListener("input", calcularMargem);
precoVenda.addEventListener("input", calcularMargem);

formProduto.addEventListener("reset", function () {
    // agenda a execução de uma função depois de um determinado tempo.
    setTimeout(() => {
        margemLucro.value = "0,00%"
        mensagemProduto.textContent = "";
    }, 0); //tempo em milissegundos
})

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigoBarras").value.trim();
    const descricao = document.getElementById("descricaoProduto").value.trim();
    const custo = Number(precoCusto.value);
    const venda = Number(precoVenda.value);
    const unidade = document.querySelector('input[name=unidade]:checked');

    //Expressão regular (REGEX) é um objeto uqe define um padrão de caracteres usados para buscar, validar
    //ou substituir textos em String;
    if(!/^\d+$/.test(codigo)){
        mensagemProduto.textContent = "Informe um código válido.";
        return;
    }

    //verificar se a descrição está preenchida corretamente e se os números são validos
    if (!descricao || !Number.isFinite(custo) ||
        !Number.isFinite(venda) || custo <=0 || venda <= 0) {
        mensagemProduto.textContent = "Preencha a descrição e informe preços maiores que zero.";

        return;
    }

    if(!unidade) {
        mensagemProduto.textContent = "Selecione uma unidade."
        return;
    }

    //fim das validações que o cliente digitou.


    let produtos;

    try {
        //Essa linha serve para recuperar a lista de produtos que foi salva no navegador e transforma-la
        //novamente em um array em javascript.
        produtos = JSON.parse(localStorage.getItem("produtos") || "[]")

        //Verifica se realmente é um ARRAY, retorna TRUE se o valor for um ARRAY
        if(!Array.isArray(produtos)){
            //Se não for um array eu abro um array em branco...
            produtos = []
        }
        //o Catch só vai ser executado se ocorrer um erro dentro do TRY
    } catch {
        produtos = []
    }

    //some = se encontrar pelo menos UM, return TRUE
    //Se nenhum atender, retorna FALSE.

    //Validando que só existe um código de barras para cada produto.
    if(produtos.some( p => 
        String(p.codigoBarras) === codigo
    )) {
        mensagemProduto.textContent =
            "Já existe um produto com esse código de barras.";
        return;
    }

    const margem = ((venda - custo) /custo )*100;

    const produto = {
        codigoBarras : codigo,
        descricaoProduto : descricao,
        precoCusto: custo,
        precoVenda: venda,
        margem: margem,
        unidade: unidade.value
    };

    produtos.push(produto)

    //salvar a lista no localStorage do navegador, permite que os dados continuem salvos mesmo depois
    //de fechar e abrir a página.

    //localStorage -> É onde o navegador armazena dados localmente
    //SetItem() -> serve para salvar uma informação.
    //"produtos" -> é o nome usado para idenficar os dados salvos.
    //JSON.stringify -> tranforma a lista de produtos em um texto para ser armazenada.
    localStorage.setItem("produtos", JSON.stringify(produtos))

    mensagemProduto.style.color = "#15803d";
    mensagemProduto.textContent = "Produto cadastrado com sucesso!";

    setTimeout(() => {
        window.location.href = "produtos.html"
    }, 700);

    console.log(produtos)
});