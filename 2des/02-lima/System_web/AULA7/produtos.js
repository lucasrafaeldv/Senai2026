const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const totalProdutos = document.getElementById("totalProdutos");
const mensagemLista = document.getElementById("mensagemLista");

function obterProdutos(){

    /* 
    1. Busco os produtos;
    2. Converto para JSON;
    3. Verifico se é um Array (lista)
    SE SIM = Retorno os dados
    SENÃO = Retorno [] em branco;
    */
    try{
        const dados = JSON.parse(
            localStorage.getItem("produtos") || "[]"
        );
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function formatarMoeda(valor){
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// valor = produto.codigoBarras.
function criarCelulas(valor){
    const td = document.createElement("td");
    td.textContent = valor;
    
    return td;
}

function renderizarProdutos (filtro = ""){
    const produtos = obterProdutos();

    const termo = filtro.trim().toLowerCase();

    //String() -> Converte todo o valor pra texto
    //.toLowerCase() -> converte todo valor em minúsculo
    //include() -> verifica se o termo pesquisado está no texto
    const filtrados = produtos.filter(produto => 
        String(produto.codigoBarras).toLowerCase().includes(termo) ||
        String(produto.descricaoProduto).toLowerCase().includes(termo)
    );

    //Remove todos os elementos que já exstem da lista de produtos.
    //Isso evita que os produtos continum aparecendo na tabela
    listaProdutos.replaceChildren();

    //atualiza o elemento totalProdutos com a quantidade total de produtos cadastrados.
    totalProdutos.textContent = produtos.length

    //Verifica se o array filtrados está vazia
    if(filtrados.length === 0) {
        //cria uma nova linha para a tabela no html;
        const tr = document.createElement("tr");
        //cria uma célula que fica dentro da linha criada
        const td = document.createElement("td");

        //Cria as linhas no tamanho de 7 coluna;
        td.colSpan = 7;
        //To colocando uma class de estilo do nosso CSS;
        td.className = "tabela-vazia";

        //IF Ternário;
        // Verifica se existe produtos cadastrados;
        //se produtos.length for igual a zero, exibe a primeira mensagem;
        //caso contrário (else) exibe a segunda mesangem;
        td.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado"
            : "Nenhum produto encontrado";

        //adiciona a célula (TD) dentro da linha (TR)
        tr.appendChild(td);
            
        //Adiciona a linha (TR) dentro da tabela listaProdutos;
        listaProdutos.appendChild(tr);

        // Interrompe a execução da função nesse ponto.
        return;   
    }

    //Percorre todos os produtos que foram encontrados na pesquisa;
    filtrados.forEach(produto => {
        //cria uma nova linha na tabela do HTML
        const tr = document.createElement("tr");

        //Cria uma célula (TD) contendo o código de brras do produto
        //a Função criarCelulas adiciona essa célula dentro da linha (tr)
        //o appendChild adiciona essa célula dentro da linha TR)
        tr.appendChild(criarCelulas(produto.codigoBarras));
        tr.appendChild(criarCelulas(produto.descricaoProduto));
        //cria uma célula contendo o preço de venda do produto
        //chamo a função formatarMoeda para colocar no formato monetário Brasileiro;
        tr.appendChild(criarCelulas(formatarMoeda(produto.precoCusto)));
        tr.appendChild(criarCelulas(formatarMoeda(produto.precoVenda)));

        //criando uma célula para a margemLucro
        tr.appendChild(criarCelulas(
            //Converte a margemLucro em número e formata conforme o padrão brasileiro
            Number(produto.margem).toLocaleString("pt-BR", {
                //garanto que o número tenha pelo menos duas casas decimais
                minimumFractionDigits: 2,
                //limita o número de 2 casas decimais no máximo
                maximumFractionDigits: 2
            }) + "%"
        ));

        tr.appendChild(criarCelulas(produto.unidade));

        //Cria uma nova célula que será utilizada para armazenar ações do produto.
        const tdAcoes = document.createElement("td");
        //Cria um novo botão no HTML
        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.className = "botao-excluir"
        botaoExcluir.textContent = "Excluir"
        
        //Adiciona um evento de clique no botão
        //quanto o usuário clicar, a função será executada
        botaoExcluir.addEventListener("click", () => {
            //Chama a função excluirProduto passando como parametro o código de barras.
            excluirProduto(produto.codigoBarras)
        });

        //adiciona o botão de excluir dentro da célula de ações;
        tdAcoes.appendChild(botaoExcluir);
        //adiciona a célla de ações dentro da linha do produto
        tr.appendChild(tdAcoes);
        //Adiciona a linha completa do produto dentro da tabela HTML
        //nesse momento, o produto e seu botão de expluir aparecem na página...
        listaProdutos.appendChild(tr);
    });
}

function excluirProduto(codigo){
    //Exibe uma janela de confirmação para excluir o produto
    const confirmar = window.confirm(
        "Deseja realmente excluir esse produto?"
    );

    //Verifica se o usuário NÃO confirmou a exlusão!
    // o operador ! é uma negação
    //se confirmar for FALSE ele interrompe a execução.
    if(!confirmar) return;

    //Recupera os produtos armazenados e utiliza o filter() para criar
    //Um array contendo todos os produtos, EXCETO aquele que será excluído.
    const produtos = obterProdutos().filter(
        //Compara o código de barras de cada produto com seu código recebido;
        //String() garante que ambos os valores sejam textos
        //O operador !== significa diferente
        //portanto, somente os produtos com código deferente serão mantidos
        produto => String(produto.codigoBarras) !== String(codigo)
    );

    //Salva novamente a lista de produtos no localStorage.
    //JSON.stringify() Transforma o array javascript e um texto Json
    //permitindo que ele seja armazenado no navegador.
    localStorage.setItem("produtos", JSON.stringify(produtos));

    //Exibe uma mensagem
    mensagemLista.textContent = "Produto Excluido";
    //atualiza toda a tabela de produtos;
    //pesquisa.value recupera o texto que está digitado no campo de pesquisa
    //Assim, a tanela continua respeitando o filtro atual.
    renderizarProdutos(pesquisa.value);
}

pesquisa.addEventListener("input", () => {
    renderizarProdutos(pesquisa.value)
})

document.getElementById("btnNovoProduto").addEventListener("click", () => {
    window.location.href = "cadastro.html"
})

document.getElementById("btnSair").addEventListener("click", () => {
    window.location.href = "login.html"
})

renderizarProdutos()