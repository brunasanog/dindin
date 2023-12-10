const express = require('express');
const rotas = express();

const { listarCategoria, FiltrarTransacaoPorCategoria,
  atualizarTransacoes, cadastrarTransacao, detalharTransacoes, excluirTransacoes, listarTransacoes, obterExtratoTransacoes,
  atualizarUsuario, cadastrarUsuario, detalharUsuario, logarUsuario } = require('./controladores/indexControladores');

const { validarCadastro, validarEdicaoUsuario,
  validarCadastroTransacao, validarIdTransacoes, validarLogin, validarUsuarioLogado} = require('./intermediadores/indexIntermediadores')

rotas.get('/usuario', detalharUsuario);
rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.put('/usuario', validarEdicaoUsuario, atualizarUsuario);

rotas.get('/categoria', validarUsuarioLogado, listarCategoria);

rotas.post('/login', validarLogin, logarUsuario);

rotas.post('/transacao', validarUsuarioLogado, validarCadastroTransacao, cadastrarTransacao);
rotas.get('/transacao/extrato', validarUsuarioLogado, obterExtratoTransacoes);
rotas.get('/transacao/:id', validarUsuarioLogado, validarIdTransacoes, detalharTransacoes);
rotas.put('/transacao/:id', validarUsuarioLogado, validarCadastroTransacao, validarIdTransacoes, atualizarTransacoes);
rotas.delete('/transacao/:id', validarUsuarioLogado, validarIdTransacoes, excluirTransacoes);
rotas.get('/transacao', validarUsuarioLogado, listarTransacoes, FiltrarTransacaoPorCategoria);


module.exports = rotas;
