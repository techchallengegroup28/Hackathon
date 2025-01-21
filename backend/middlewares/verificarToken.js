const jwt = require("jsonwebtoken");

module.exports = function verificarToken(req, res, next) {
  const cabecalhoAutorizacao = req.headers["authorization"];

  if (!cabecalhoAutorizacao) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = cabecalhoAutorizacao.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
    if (erro) {
      console.error("Erro ao verificar o token:", erro);
      return res.status(403).json({ erro: "Token inválido" });
    }

    req.usuario = usuario;
    next();
  });
};
