const express = require("express")
const consultas = require("../dados.json")

const mostrarConsulta = (req, res) => {
    calcularIMC()
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        consultas.push(req.body)
        res.send("Consulta recebida, em análise")
    } else {
        res.send("Erro ao receber Consulta")
    }
}

const calcularIMC = () => {
    consultas.forEach(c => {
        c.imc = c.peso / (c.altura * c.altura).toFixed(2);
    })
}

const app = express()

app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.post("/", novaConsulta)
app.get("/", mostrarConsulta)

app.listen(porta, () => {
    console.log(`Cliente: http://127.0.0.1:5500/cliente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})
