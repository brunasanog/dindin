const bcrypt = require('bcrypt');
const conexao = require('../../configuracoes/conexao/conexao');


async function cadastrarUsuario (req, res) {

    const {nome, email, senha} = req.body;

    try{
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const {rows} = await conexao.query(`
        insert into usuarios (nome, email, senha)
        values ($1, $2, $3) returning *`,
        [nome, email, senhaCriptografada]);

        const {senha:_ ,...UsuarioSemSenha} = rows[0];

        return res.status(201).json(UsuarioSemSenha);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    };
};
  module.exports = cadastrarUsuario;
