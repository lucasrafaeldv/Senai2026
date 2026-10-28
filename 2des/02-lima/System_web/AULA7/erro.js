try {
    const resultado = JSON.parse("Isso não é um jason vlido");
    console.log(resultado)
}catch (erro){
    console.error("Ocorreu um erro ao processar o JSON", erro.mensage)
} finally {
    console.log("Processando ")
}