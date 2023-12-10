const conexao = require('../../configuracoes/conexao/conexao');
require('dotenv').config();
const senhaSecreta = process.env.chaveSecreta;
const jwt = require('jsonwebtoken');

async function detalharUsuario(req, res) {

  try{
      const token = req.headers.authorization.split(' ')[1];
      const idToken = jwt.verify(token, senhaSecreta);

      const {rows, rowCount} = await conexao.query('select id, nome, email from usuarios where id = $1', [idToken.id]);

      if (rowCount < 1) {
        return res.status(404).json({ mensagem: "Usuário não existente." })
      };

      if (!idToken.id) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."})
      };

      const {senha:_ ,...UsuarioSemSenha} = rows[0];

      return res.status(201).json(UsuarioSemSenha);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
      };
}


module.exports = detalharUsuario;
