

// pessoa vai ser o objeto
let pessoa = {
    nome:"Lucas",
    idade:"16",
    cidade:"Jaguariuna",
    BandaFavorita:"Deftones"
}

    //mostrando a propriedade de um objeto
    console.log("Banda Favorita:  $(pessoa.BandaFavorita), essa banda e muito boa");

    //Adicionando uma nova propriedade ao objeto
    pessoa.curso = "Desenvolvimento de SISTEMAS";

    //Deletando uma propriedade de um objeto
    delete pessoa.BandaFavorita;
    console.log(pessoa);