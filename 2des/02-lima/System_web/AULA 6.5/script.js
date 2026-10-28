//pegando os input
const nome = document.getElementById("nome");
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");

//pegando o botao
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");

//pegando os paragráfos de resultado
const nomeResultado = document.getElementById("nomeResultado");
const mediaResultado = document.getElementById("mediaResultado");
const situacaoResultado = document.getElementById("situacaoResultado");


btnCalcular.addEventListener("click", function() {
    const nomeAluno = nome.value;
    const valorNota1 = parseFloat(nota1.value);
    const valorNota2 = parseFloat(nota2.value);
    const valorNota3 = parseFloat(nota3.value);

    if (nomeAluno === "") {
        alert("Digite o nome do Aluno");
        return;
    }

    if(isNaN(valorNota1) || isNaN(valorNota2) || isNaN(valorNota3)){
        alert("Preencha todas as Notas");
        return;
    }

   if(valorNota1 < 0 || valorNota1 > 10 ||
     valorNota2 < 0 || valorNota2 > 10 ||
     valorNota3 < 0 || valorNota3 > 10
    ){
     alert("As notas devem ser entre 0 e 10!");
     }

     const media = (valorNota1 + valorNota2 + valorNota3)/3;

     let situacao;
     let classeSituacao;

    if(media >= 7){
        situacao = "Aprovado!"
        classeSituacao = "aprovado"
    } else if (media >= 5){
        situacao = "Recuperação"
        classeSituacao = "recuperacao"
    } else{
        situacao = "Reprovado"
        classeSituacao = "reprovado"
    }

    nomeResultado.textContent = `Aluno:  ${nomeAluno}`;

    mediaResultado.textContent = `Media:  ${media.toFixed(2)}`;

    situacaoResultado.textContent = `Situacao:  ${situacao}`;

    situacaoResultado.className = classeSituacao;

});

btnLimpar.addEventListener("click", function(){
    nome.value = "";
    nota1.value = "";
    nota2.value = "";
    nota3.value = "";

    nomeResultado.textContent ="";
    mediaResultado.textContent ="";
    situacaoResultado.textContent = "";
    
})