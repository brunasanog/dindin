const conexao = require('../configuracoes/conexao/conexao');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const senhaSecreta = process.env.chaveSecreta;

async function validarCadastro(req, res, next) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos.' })
  };

  const { rows, rowCount } = await conexao.query('select * from usuarios where email = $1', [email]);

  if (rowCount > 0) {

    return res.status(404).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })

  };

  if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    return res.status(404).json("E-mail inválido.")
  };

  req.usuario = rows[0];

  next();

};

async function validarEdicaoUsuario(req, res, next) {

  const { nome, email, senha } = req.body;

  const token = req.headers.authorization.split(' ')[1];
  const idToken = jwt.verify(token, senhaSecreta);

  try {

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos.' })
    };

    const { rows, rowCount } = await conexao.query('select * from usuarios where id = $1', [idToken.id]);

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: 'E-mail e/ou senha inválido(s).' })
    };

    const verificarEmail = await conexao.query('select * from usuarios where email = $1', [email]);

    if (verificarEmail.rowCount > 0) {
      return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
    };

    req.usuario = rows[0];

    next();

  } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  };
};

module.exports = {
  validarCadastro,
  validarEdicaoUsuario
};
