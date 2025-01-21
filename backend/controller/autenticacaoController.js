const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../model/Usuario");

module.exports = class autenticacaoController {
  static async realizarLogin(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({
        where: { email },
      });

      if (!usuario) {
        return res.status(401).json({ erro: "E-mail ou senha inválidos." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ erro: "E-mail ou senha inválidos." });
      }

      const dadosToken = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      };

      const tokenDeAcesso = jwt.sign(dadosToken, process.env.JWT_SECRET);

      return res.json({ token_acesso: tokenDeAcesso });
    } catch (erro) {
      console.error("Erro ao realizar login:", erro);
      return res
        .status(500)
        .json({ erro: "Ocorreu um erro ao tentar fazer login." });
    }
  }

  static async renovarToken(req, res) {
    const { email, token } = req.body;

    try {
      if (!token) {
        return res.status(400).json({ erro: "Token não fornecido." });
      }

      jwt.verify(
        token,
        process.env.JWT_SECRET,
        async (erro, dadosDecodificados) => {
          if (erro) {
            return res
              .status(401)
              .json({ erro: "Token inválido ou expirado." });
          }

          const usuario = await Usuario.findOne({
            where: { email },
          });

          if (!usuario) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
          }

          const novosDadosToken = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo_usuario: usuario.tipo_usuario,
          };

          const novoTokenDeAcesso = jwt.sign(
            novosDadosToken,
            process.env.JWT_SECRET
          );

          return res.json({ token_acesso: novoTokenDeAcesso });
        }
      );
    } catch (erro) {
      console.error("Erro ao renovar o token:", erro);
      return res
        .status(500)
        .json({ erro: "Ocorreu um erro ao tentar renovar o token." });
    }
  }
};
