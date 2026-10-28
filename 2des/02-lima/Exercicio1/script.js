
const botao = document.getElementById("botao");

botao.addEventListener("click", function(){
    
    const user = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    
    if (user === "login" && senha === "1234") {
        alert("Login realizado com sucesso!");
    } else {
        alert("Login ou senha incorretos!");
    }
});