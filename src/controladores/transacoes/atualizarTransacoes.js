const conexao = require('../../configuracoes/conexao/conexao');

async function atualizarTransacoes(req, res) {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    await conexao.query(`
      update transacoes
      set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
      where id = $6`, [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(204).send();

  } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  };
};

module.exports = atualizarTransacoes;
