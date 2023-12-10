const { Pool } = require("pg");

require('dotenv').config();

const conexao = new Pool({
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE
});

module.exports = conexao;