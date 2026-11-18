const botaoEntrar = document.getElementById("botaoEntrar");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const mensagemErro = document.getElementById("mensagemErro");

botaoEntrar.addEventListener("click", (event) => {
  event.preventDefault();

  const usuario = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (usuario === "" || senha === "") {
    mensagemErro.textContent = "Preencha todos os campos.";
    return;
  }

  if (usuario === "teste@exemplo.com" && senha === "senai123") {
    window.location.href = "../menuPrincipal/menuPrincipal.html";
  } else {
    mensagemErro.textContent = "Usuário ou senha incorretos. Tente novamente.";
  }
});

// Some com a mensagem de erro assim que a pessoa volta a digitar
[campoEmail, campoSenha].forEach((campo) => {
  campo.addEventListener("input", () => {
    mensagemErro.textContent = "";
  });
});