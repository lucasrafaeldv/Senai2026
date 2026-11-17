function verificarNumeros(){

    let numeros =[]

numeros.push(Number(document.getElementById("n1").value));
numeros.push(Number(document.getElementById("n2").value));
numeros.push(Number(document.getElementById("n3").value));
numeros.push(Number(document.getElementById("n4").value));
numeros.push(Number(document.getElementById("n5").value));

let maior = numeros[0];
let menor = numeros[0];

let soma = 0;
let pares = 0;
let impares = 0;

for (let i = 0; i < numeros.length; i++) {
    let numero = numeros[i];

    soma = soma + numero;

    if (numero > maior) {
        maior = numero;
    }

    if(numero < menor){
        menor = numero;
    }

    if(numero % 2 === 0){
        pares++;
    }else {
        impares++;}

 }

 document.getElementById("resultado").innerHTML = "Maior número: " + maior;
 document.getElementById("resultado").innerHTML = "Menor número: " + menor;
 document.getElementById("resultado").innerHTML = "soma dos número: " + soma;
 document.getElementById("resultado").innerHTML = "pares número: " + pares;
 document.getElementById("resultado").innerHTML = "impares número: " + impares;
 
}