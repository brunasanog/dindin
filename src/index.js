const express = require("express");
const rotas = require('./rotas');
const porta = 3000;

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(porta);
console.log("ouvindo porta 3000");
