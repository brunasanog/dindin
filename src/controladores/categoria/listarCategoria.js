
const conexao = require('../../configuracoes/conexao/conexao');


async function listarCategoria (req, res) {

  try {

    const categorias = await conexao.query(`
    SELECT * FROM  categorias `);

    return res.status(200).json(categorias.rows);

  } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}

module.exports = listarCategoria;
