const semana = {
    segunda:150,
    terca:200,
    quarta:100,
    quinta:300,
    sexta:250
}

const chaves = Object.keys(semana)
let total = 0;

for(let i = 0; i < chaves.length; i++){
    total = total + semana[chaves[i]]
}
 
console.log(total);


const usuario ={
    nome:'Pedro',
    email:'pedro@gmail.com',
    idade:25,
    cidade:"Jaguariuna"
}

const chaves1 = Object.keys(usuario)
let resposta = 0;
for(let i = 0; i < chaves1.length; i++){
    const chave = chaves[i]
}
console.log()