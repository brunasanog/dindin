const { validarCadastro, validarEdicaoUsuario } = require('./validarCadastroUsuario.js')

const validarCadastroTransacao = require('./validarCadastroTransacao')
const validarIdTransacoes = require('./validarIdTransacoes')
const validarLogin = require('./validarLogin.js')
const validarUsuarioLogado = require('./validarUsuarioLogado')


module.exports = {
  validarCadastro,
  validarEdicaoUsuario,
  validarCadastroTransacao,
  validarIdTransacoes,
  validarLogin,
  validarUsuarioLogado,
  }
