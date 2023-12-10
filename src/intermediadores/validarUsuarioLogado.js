const jwt = require('jsonwebtoken');
const conexao = require('../configuracoes/conexao/conexao');
require('dotenv').config();

const senhaSecreta = process.env.chaveSecreta;

async function validarUsuarioLogado(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Este usuário não está autorizado.' })
  };
  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, senhaSecreta);

    const { rows, rowCount } = await conexao.query(
      'select * from usuarios where id = $1', [id]
    );

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: 'Este usuário não está autorizado.' })
    };

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({ mensagem: "Erro interno do servidor." })
  };
};

module.exports = validarUsuarioLogado;
