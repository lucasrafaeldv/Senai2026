const formProduto = document.getElementById("formProduto");
const precoCusto = document.getElementById("precoCusto");
const precoVenda = document.getElementById("precoVenda");
const margemLucro = document.getElementById("margemLucro");
const mensagemProduto = document.getElementById("mensagemProduto");

function calcularMargem(){
    const custo = Number(precoCusto.value);
    const venda = Number(precoVenda.value);

    if(precoCusto.value === ""||
       precoVenda.value === ""||
       custo <= 0 ||
       venda < 0) {
        margemLucro.value = "-"
        return;
       }
    
    const margem = ((venda - custo) / custo) * 100;
       //Converte Dinheiro Para Real (R$)-----
       margemLucro.value = margem.toLocaleString("pt-Br", {
       //Define que o numero deve ter pelo menos duas casas decimais 
        minimumFractionDigits: 2,
        //Define que o numero deve ter nomaximo duas casas decimais 
        maximumFractionDigits: 2
       }) + "%";
}

precoCusto.addEventListener('input', calcularMargem)
precoVenda.addEventListener('input', calcularMargem)

formProduto.addEventListener("reset", function(){
    // Agenda a Execução de uma função depois de um determinado tempo.
    setTimeout(() => {
    margemLucro.value = "0.00%"
    mensagemProduto.textContent = ""   
    }, 0)
})

formProduto.addEventListener('submit', function(event){
    event.preventDefault();

    const codigo =  document.getElementById("codigoBarras").value.trim();
    const descricao  =  document.getElementById("descricaoProduto").value.trim();
    const custo = Number(precoCusto.value);
    const venda = Number(precoVenda.value);
    const unidade = this.querySelector('input[name=unidade]:checked');

});

if(!/^\d+$/.test(codigo)){
    mensagemProduto.textContent = "Informe um codigo válido"
    return;
}

if(!descricao || !Number.isFinite(custo)||
   !Number.isFinite(venda) || custo<=0 || venda <=0){
    mensagemProduto.textContent = "Preencha a descrição e informe preços maiores que zero" 
    return;
   };

  if(!unidade){
    mensagemProduto.textContent = "Selecione uma Unidade."
    return;
  }

  // FIM da validações que o cliente digitou.
  let produtos;

  try {
    //Essa linha serve pra recuperar a lista deprodutos que foi salva 
    //no navegador e transforma-la novamente em uma array ou lista em JS
    produtos = JSON.parse(localStorage.getItem("produtos")|| "[]")

    if(!Array.isArray(produtos)){
        produtos = []
    }
  } catch{
    produtos = []
  }
  //some = se encontrar pelo menos UM, retorno TRUE 
  //SE nenhum atender, retorna FALSE.
  if(produtos.some(p =>
    String(p.codigoBarras) === codigo
  ))
  //Validando que só existe um código de barras para cada produto.
  {
    mensagemProduto.textContent =
        "Ja existe um produto com esse código de barras.";
      return;   
  }    

  const margem = (( venda - custo) / custo)* 100

  const produto = {
    codigoBarras : codigo,
    descricaoProduto: descricao,
    precoCusto: custo,
    precoVenda: venda,
    margem: margem,
    unidade: unidade.value
  }