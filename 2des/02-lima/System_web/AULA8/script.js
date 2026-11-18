
const formulario = document.getElementById("loginForm");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    resultado.className = "processando";
    resultado.innerHTML = "INITIALIZING SYSTEM...";

    setTimeout(() => {

        if (usuario === "Lucas3y4ufndw06%#¨¨" && senha === "Ksuen4937;~~@") {

            resultado.className = "sucesso";

            resultado.innerHTML = `
                <h2>ACCESS GRANTED</h2>
                <p>Authentication successful!</p>
                <p>Welcome, ${usuario}.</p>
                <p>System unlocked.</p>
            `;

        } else {

            resultado.className = "erro";

            resultado.innerHTML = `
                <h2>ACCESS DENIED</h2>
                <p>Invalid credentials!</p>
                <p>Authentication failed.</p>
                <p>System remains locked.</p>
            `;

        }

    }, 1500);
});
