const conexao = require('../../configuracoes/conexao/conexao');

async function excluirTransacoes(req, res) {
  const { id } = req.params;

  const transacaoApagada = await conexao.query
    (`delete from transacoes
    where id = $1`, [id]);

  if (!transacaoApagada) {
    return res.status(404).json({ Mensagem: 'Não foi possível excluir essa transação.' })
  };

  return res.status(200).send();
}

module.exports = excluirTransacoes;
