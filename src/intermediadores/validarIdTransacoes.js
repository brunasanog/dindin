const jwt = require('jsonwebtoken');
const conexao = require('../configuracoes/conexao/conexao');
const senhaSecreta = process.env.chaveSecreta;

async function validarIdTransacoes(req, res, next) {

  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const idToken = jwt.verify(token, senhaSecreta);

    const { rows, rowCount } = await conexao.query(`
    select * from transacoes
    where id = $1`, [id]);

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não existente." })
    };

    if (rows[0].usuario_id !== idToken.id) {
      return res.status(401).json({ mensagem: "Permissão negada." })
    };

    req.transacao = rows[0];

    next();

  } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
  };
};

module.exports = validarIdTransacoes;
