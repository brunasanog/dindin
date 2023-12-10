const conexao = require('../../configuracoes/conexao/conexao');

const FiltrarTransacaoPorCategoria = async (req, res) => {
  const { filtro } = req.query;

  const { usuario } = req;

  try {
    const categorias = filtro.map((categoria) => categoria.normalize("NFD").toLowerCase());

    const sql = `
      select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, c.id as categoria_id, c.descricao as categoria_nome
      from transacoes t
      join categorias c ON t.categoria_id = c.id
      where t.usuario_id = $1 and lower(c.descricao) = any($2)`

    const resultado = await conexao.query(sql, [usuario.id, categorias]);

    return res.status(200).json(resultado.rows);

  } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
  };
};

module.exports = FiltrarTransacaoPorCategoria;
