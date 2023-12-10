const bcrypt = require('bcrypt');
const conexao = require('../configuracoes/conexao/conexao');

async function validarLogin(req, res, next) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha precisam ser preenchidos.' });
  };

  const { rows, rowCount } = await conexao.query('select * from usuarios where email = $1', [email]);

  if (rowCount < 1) {
    return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)."})
  };

  if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    return res.status(404).json("E-mail inválido.")
  };

  try {
    const senhaValida = await bcrypt.compare(senha, rows[0].senha);

    if (!senhaValida) {
      return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
    };

    req.usuario = rows[0];

    next();

  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor."})
    };

};
module.exports = validarLogin;


