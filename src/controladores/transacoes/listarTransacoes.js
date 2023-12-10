const conexao = require('../../configuracoes/conexao/conexao');

async function listarTransacoes(req, res) {

  const { usuario } = req;

  try {

    const resposta = await conexao.query(`
    select * from transacoes
    where usuario_id = $1`, [usuario.id]);

    return res.json(resposta.rows);

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    };
};

module.exports = listarTransacoes;

