const bcrypt = require('bcrypt');
const conexao = require('../../configuracoes/conexao/conexao');

async function atualizarUsuario(req, res) {

  const { nome, email, senha } = req.body;

  const { usuario } = req;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await conexao.query(
      'update usuarios set nome = $1, email = $2, senha = $3 where id = $4',
      [nome, email, senhaCriptografada, usuario.id]);


    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  };

};

module.exports = atualizarUsuario;
