const jwt = require('jsonwebtoken');
require('dotenv').config();


function logarUsuario(req, res) {
  const { usuario } = req;

  try {
    const token = jwt.sign({ id: usuario.id }, process.env.chaveSecreta, { expiresIn: "8h" });
    const usuarioFinal = {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        },
      token
    };
    return res.status(200).json(usuarioFinal);

  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"});
  };
};
module.exports = logarUsuario;

