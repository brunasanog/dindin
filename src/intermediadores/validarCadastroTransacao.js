const conexao = require('../configuracoes/conexao/conexao');

async function validarCadastroTransacao(req, res, next) {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados."})
  };

  if (tipo !== 'entrada' && tipo !== 'saida') {
    return res.status(400).json({ mensagem: 'O tipo informado não foi reconhecido.' })
  };

  try {

    const categoriaExistente = await conexao.query(`
    select id from categorias
    where id = $1
    `, [categoria_id]);

    if (categoriaExistente.rowCount < 1) {
      return res.status(400).json({ mensagem: 'A categoria informada não existe.' })
    };
  } catch (error) {
      return res.status(500).json({ Mensagem: 'Erro interno do servidor.' })
    };
    
  next();

};

module.exports = validarCadastroTransacao;
