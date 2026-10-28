
const formu = document.getElementById("formuPedido");

formu.addEventListener("submit", function(event) {
    event.preventDefault();

    const Nome = document.getElementById("nome").value;
    const lanche = Number(document.getElementById("lanche").value);
    const quantidade = Number(document.getElementById("quantidade").value);
    const Bebida = Number(document.getElementById("bebida").value);

    const Subtotal = (lanche * quantidade) + Bebida;

    let Desconto = 0;

    if (Subtotal >= 50) {
        Desconto = Subtotal * 0.10;
    }

    const total = Subtotal - Desconto;

    document.getElementById("resultado").innerHTML = `
        <h2>Pedido realizado!</h2>
        <p>Cliente: ${Nome}</p>
        <p>Quantidade: ${quantidade}</p>
        <p>Subtotal: R$ ${Subtotal.toFixed(2)}</p>
        <p>Desconto: R$ ${Desconto.toFixed(2)}</p>
        <h3>Total: R$ ${total.toFixed(2)}</h3>`
    ;
});