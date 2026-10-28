
/*function dobrar(numero){
return numero*2;
}
console.log (dobrar(4));*/


/*function verificarNumero(numero){
    if(numero < 0){
    console.log ("negativo");
    
    } 
    else if (numero > 0){
       console.log ("Positivo");  
    } 
    else{ 
        console.log ("zero");
        
    }
}
verificarNumero(5)*/



/*function maiorNumero(n1,n2){
    if  (n1 > n2){
       
        return n1}

    else{
        return n2
    }
}
    
console.log(maiorNumero(10,30));*/


/*function caucularIdade(anonasc,anoatu){
    console.log(anonasc - anoatu);
}
caucularIdade(2023,2001);*/


/*function celPFah(cel){
    fah = cel * 1.8 + 32;
    return fah
}
function fahPCel(fah){
    cel = (fah - 32) / 1.8
    return fah
}
console.log(celPFah(30));
console.log(fahPCel(70));*/


function calcularIMC(peso,altura){
   var IMC = peso / (altura * altura)
    return classificarIMC(IMC)
}


function classificarIMC(IMC){
 
    if(IMC < 18.5 ){
    return "Abaixo do Peso"
    }

    else if  (IMC >= 18.5 && IMC <= 24.9){
    return "Peso Normal"
    }

    else if (IMC >= 25 && IMC <= 29.9){
    return "Sobrepeso"    
    }

    else return "Obesidade";


}

let IMC = calcularIMC(800, 1.75);

console.log(IMC);
console.log(IMC);



