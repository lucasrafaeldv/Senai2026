function enviar(){

    const nome = document.getElementById("n").value;

    let mensagem = "oie " + nome + " seja bem vindo";

    document.getElementById("mensagem").innerText = mensagem;

    console.log("Testes")
}