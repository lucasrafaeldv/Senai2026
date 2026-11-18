document.querySelectorAll('.btn-olho').forEach(botao => {
    botao.addEventListener('click', function () {
        const input = document.getElementById(this.dataset.target);
        const oculto = input.type === 'password';

        input.type = oculto ? 'text' : 'password';
        this.textContent = oculto ? '🙈' : '👁️';
    });
});

document.getElementById('formNovaSenha').addEventListener('submit', function(event) {
    event.preventDefault();

    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const mensagemErro = document.getElementById('mensagemErro');

    mensagemErro.textContent = '';

    if (novaSenha !== confirmarSenha) {
        mensagemErro.textContent = 'As senhas não coincidem. Verifique e tente novamente.';
        return;
    }

    if (novaSenha.length < 6) {
        mensagemErro.textContent = 'A senha precisa ter pelo menos 6 caracteres.';
        return;
    }

    alert('Senha redefinida com sucesso!');
    window.location.href = '../LoginUsuario/usuarioLogin.html';
});