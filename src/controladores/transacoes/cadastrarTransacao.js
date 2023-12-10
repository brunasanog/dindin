const conexao = require('../../configuracoes/conexao/conexao');

async function cadastrarTransacao(req, res) {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { usuario } = req;

  try {

    const transacaoCadastrada = await conexao.query

      (`insert into transacoes (tipo, descricao, valor, data, usuario_id, categoria_id)
      values ($1, $2, $3, $4, $5, $6) returning id, tipo, descricao, valor, data, usuario_id, categoria_id`, [tipo, descricao, valor, data, usuario.id, categoria_id]

      );

    return res.status(200).json(transacaoCadastrada.rows[0]);

  } catch (error) {
     return res.status(500).json({ Mensagem: 'Erro interno do servidor.' })
  };
  
};

module.exports = cadastrarTransacao;