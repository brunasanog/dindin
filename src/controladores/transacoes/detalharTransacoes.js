async function detalharTransacoes(req, res) {

  const { usuario_id, ...resposta } = req.transacao;

  
  return res.status(200).json(resposta);
}

module.exports = detalharTransacoes;
