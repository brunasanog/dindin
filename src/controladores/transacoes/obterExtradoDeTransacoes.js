const conexao = require('../../configuracoes/conexao/conexao');

async function obterExtratoTransacoes(req, res) {

  const { usuario } = req;

  try {

    const transacoesEntrada = await conexao.query(
      'select sum(valor) as total_entrada from transacoes where usuario_id = $1 and tipo = $2',
      [usuario.id, 'entrada']
    );

    const transacoesSaida = await conexao.query(
      'select sum(valor) as total_saida from transacoes where usuario_id = $1 and tipo = $2',
      [usuario.id, 'saida']
    );

    const totalEntradas = (transacoesEntrada.rows[0].total_entrada || 0);
    const totalSaidas = (transacoesSaida.rows[0].total_saida || 0);

    return res.status(200).json({
      entrada: parseInt(totalEntradas),
      saida: parseInt(totalSaidas),
    });

  } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  };
};

module.exports = obterExtratoTransacoes;
