const Usuario = require("../model/Usuario");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = class usuarioController {
  static async formatarRespostaUsuario(usuario) {
    const { senha, ...dadosUsuario } = usuario.dataValues;
    return dadosUsuario;
  }

  static async principal(req, res) {
    try {
      const pagina = parseInt(req.query.pagina) || 1;
      const limite = parseInt(req.query.limite) || 10;

      if (isNaN(pagina) || pagina < 1 || isNaN(limite) || limite < 1) {
        return res
          .status(400)
          .json({ erro: "Parâmetros de paginação inválidos." });
      }

      const resultado = await Usuario.findAndCountAll({
        attributes: { exclude: ["senha"] },
        limit: limite,
        offset: (pagina - 1) * limite,
      });

      const usuarios = await Promise.all(
        resultado.rows.map(async (usuario) => {
          return await usuarioController.formatarRespostaUsuario(usuario);
        })
      );

      return res.status(200).json({
        usuarios,
        total: resultado.count,
        pagina,
        limite,
      });
    } catch (erro) {
      console.error("Erro ao obter usuários:", erro);
      return res.status(500).json({ erro: "Erro ao obter lista de usuários." });
    }
  }

  static async unico(req, res) {
    try {
      const idUsuarioRequisitado = parseInt(req.params.id, 10);
      if (isNaN(idUsuarioRequisitado)) {
        return res.status(400).json({ erro: "ID de usuário inválido." });
      }

      const usuarioAutenticado = await Usuario.findByPk(idUsuarioRequisitado);

      if (!usuarioAutenticado) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      const eProfessor = usuarioAutenticado.tipo_usuario === "professor";
      const eMesmoUsuario = usuarioAutenticado.id === idUsuarioRequisitado;

      if (!eProfessor && !eMesmoUsuario) {
        return res.status(403).json({
          erro: "Acesso negado. Você só pode acessar seus próprios dados.",
        });
      }

      const usuarioFormatado = await usuarioController.formatarRespostaUsuario(
        usuarioAutenticado
      );
      return res.status(200).json(usuarioFormatado);
    } catch (erro) {
      console.error("Erro ao obter usuário:", erro);
      return res.status(500).json({ erro: "Erro ao obter usuário." });
    }
  }

  static async novo(req, res) {
    try {
      const dados = req.body;

      if (!dados.nome || !dados.email || !dados.senha || !dados.tipo_usuario) {
        return res
          .status(400)
          .json({ erro: "Usuário não criado! Faltam dados." });
      }

      if (dados.nome.length < 3) {
        return res
          .status(400)
          .json({ erro: "Nome deve ter pelo menos 3 caracteres." });
      }

      if (dados.senha.length < 6) {
        return res
          .status(400)
          .json({ erro: "Senha deve ter pelo menos 6 caracteres." });
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(dados.email)) {
        return res.status(400).json({ erro: "Email inválido." });
      }

      const usuarioExistente = await Usuario.findOne({
        where: { email: dados.email },
      });
      if (usuarioExistente) {
        return res.status(400).json({ erro: "Email já está em uso." });
      }

      const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

      const novoUsuario = {
        nome: dados.nome,
        email: dados.email,
        senha: senhaCriptografada,
        tipo_usuario: dados.tipo_usuario,
      };

      const usuarioCriado = await Usuario.create(novoUsuario);
      const respostaUsuario = await usuarioController.formatarRespostaUsuario(
        usuarioCriado
      );

      return res.status(201).json(respostaUsuario);
    } catch (erro) {
      console.error("Erro ao criar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao criar usuário." });
    }
  }

  static async atualizar(req, res) {
    try {
      const dados = req.body;
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID de usuário inválido." });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      if (dados.email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(dados.email)) {
          return res.status(400).json({ erro: "Email inválido." });
        }

        const usuarioExistente = await Usuario.findOne({
          where: { email: dados.email, id: { [Op.ne]: id } },
        });
        if (usuarioExistente) {
          return res.status(400).json({ erro: "Email já está em uso." });
        }
      }

      if (dados.senha) {
        if (dados.senha.length < 6) {
          return res
            .status(400)
            .json({ erro: "Senha deve ter pelo menos 6 caracteres." });
        }
        dados.senha = await bcrypt.hash(dados.senha, 10);
      } else {
        dados.senha = usuario.senha;
      }

      await usuario.update(dados);

      const usuarioAtualizado = await usuarioController.formatarRespostaUsuario(
        usuario
      );

      return res.status(200).json(usuarioAtualizado);
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao atualizar usuário." });
    }
  }

  static async deletar(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ erro: "ID de usuário inválido." });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      await Usuario.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: "Usuário deletado com sucesso!" });
    } catch (erro) {
      console.error("Erro ao deletar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao deletar usuário." });
    }
  }
};
