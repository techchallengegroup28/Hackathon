const Conteudo = require("../model/Conteudo");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

function converterImagensParaBase64(conteudo) {
  let imagemBase64 = null;
  if (conteudo.imagem != null) {
    imagemBase64 = conteudo.imagem.toString("base64");
  }

  return {
    ...conteudo.dataValues,
    imagem: imagemBase64,
  };
}

module.exports = class conteudoController {
  static async principal(req, res) {
    try {
      let listaConteudos = await Conteudo.findAll();

      listaConteudos = listaConteudos.map((conteudo) =>
        converterImagensParaBase64(conteudo)
      );

      return res.status(200).json(listaConteudos);
    } catch (erro) {
      console.error("Erro ao obter conteúdos:", erro);
      return res
        .status(500)
        .json({ erro: "Erro ao obter a lista de conteúdos." });
    }
  }

  static async unico(req, res) {
    try {
      const conteudoId = parseInt(req.params.id, 10);
      if (isNaN(conteudoId)) {
        return res.status(400).json({ erro: "ID do conteúdo inválido." });
      }

      let conteudo = await Conteudo.findByPk(conteudoId);

      if (!conteudo) {
        return res.status(404).json({ erro: "Conteúdo não encontrado." });
      }

      conteudo = converterImagensParaBase64(conteudo);
      return res.status(200).json(conteudo);
    } catch (erro) {
      console.error("Erro ao obter conteúdo:", erro);
      return res.status(500).json({ erro: "Erro ao obter o conteúdo." });
    }
  }

  static async novo(req, res) {
    try {
      const dados = req.body;

      if (!dados.titulo || !dados.descricao || !dados.texto_conteudo) {
        return res
          .status(400)
          .json({ erro: "Conteúdo não criado! Faltam dados." });
      }

      let nomeArquivo = null;
      if (req.file) {
        nomeArquivo = req.file.filename;
      }

      const novoConteudo = {
        titulo: dados.titulo,
        descricao: dados.descricao,
        texto_conteudo: dados.texto_conteudo,
        imagem: dados.imagem ? Buffer.from(dados.imagem, "base64") : null,
        link_youtube: dados.link_youtube,
        nome_documento: nomeArquivo,
        saiba_mais: dados.saiba_mais,
        data_postagem: new Date(),
        data_atualizacao: new Date(),
      };

      const conteudoCriado = await Conteudo.create(novoConteudo);

      return res.status(201).json(converterImagensParaBase64(conteudoCriado));
    } catch (erro) {
      console.error("Erro ao criar conteúdo:", erro);
      return res.status(500).json({ erro: "Erro ao criar o conteúdo." });
    }
  }

  static async atualizar(req, res) {
    try {
      const conteudoId = parseInt(req.params.id, 10);

      if (isNaN(conteudoId)) {
        return res.status(400).json({ erro: "ID do conteúdo inválido." });
      }

      const conteudo = await Conteudo.findByPk(conteudoId);

      if (!conteudo) {
        return res.status(404).json({ erro: "Conteúdo não encontrado." });
      }

      const dados = req.body;

      let nomeArquivo = conteudo.nome_documento;

      if (req.file) {
        const arquivo = req.file;

        if (nomeArquivo) {
          const caminhoArquivoAntigo = path.join(
            __dirname,
            "..",
            "uploads",
            nomeArquivo
          );
          if (fs.existsSync(caminhoArquivoAntigo)) {
            fs.unlinkSync(caminhoArquivoAntigo);
          }
        }

        nomeArquivo = arquivo.filename;
      }

      const dadosAtualizados = {
        titulo: dados.titulo || conteudo.titulo,
        descricao: dados.descricao || conteudo.descricao,
        texto_conteudo: dados.texto_conteudo || conteudo.texto_conteudo,
        imagem: dados.imagem
          ? Buffer.from(dados.imagem, "base64")
          : conteudo.imagem,
        link_youtube: dados.link_youtube || conteudo.link_youtube,
        nome_documento: nomeArquivo,
        saiba_mais: dados.saiba_mais || conteudo.saiba_mais,
        data_atualizacao: new Date(),
      };

      await conteudo.update(dadosAtualizados);

      return res.status(200).json(converterImagensParaBase64(conteudo));
    } catch (erro) {
      console.error("Erro ao atualizar conteúdo:", erro);
      return res.status(500).json({ erro: "Erro ao atualizar o conteúdo." });
    }
  }

  static async admin(req, res) {
    try {
      let listaConteudos = await Conteudo.findAll();

      listaConteudos = listaConteudos.map((conteudo) =>
        converterImagensParaBase64(conteudo)
      );

      return res.status(200).json(listaConteudos);
    } catch (erro) {
      console.error("Erro ao obter conteúdos administrativos:", erro);
      return res.status(500).json({ erro: "Erro ao obter conteúdos." });
    }
  }

  static async deletar(req, res) {
    try {
      const conteudoId = parseInt(req.params.id, 10);
      if (isNaN(conteudoId)) {
        return res.status(400).json({ erro: "ID do conteúdo inválido." });
      }

      const conteudo = await Conteudo.findByPk(conteudoId);

      if (!conteudo) {
        return res.status(404).json({ erro: "Conteúdo não encontrado." });
      }

      if (conteudo.nome_documento) {
        const caminhoArquivo = path.join(
          __dirname,
          "..",
          "uploads",
          conteudo.nome_documento
        );
        if (fs.existsSync(caminhoArquivo)) {
          fs.unlinkSync(caminhoArquivo);
        }
      }

      await Conteudo.destroy({ where: { id: conteudoId } });

      return res
        .status(200)
        .json({ mensagem: "Conteúdo deletado com sucesso!" });
    } catch (erro) {
      console.error("Erro ao deletar conteúdo:", erro);
      return res.status(500).json({ erro: "Erro ao deletar o conteúdo." });
    }
  }

  static async pesquisa(req, res) {
    try {
      const termoBusca = req.query.buscar;

      if (!termoBusca) {
        return res.status(400).json({ erro: "Termo de busca não fornecido." });
      }

      let conteudos = await Conteudo.findAll({
        where: {
          [Op.or]: [
            { titulo: { [Op.like]: `%${termoBusca}%` } },
            { texto_conteudo: { [Op.like]: `%${termoBusca}%` } },
          ],
        },
      });

      conteudos = conteudos.map((conteudo) =>
        converterImagensParaBase64(conteudo)
      );

      return res.status(200).json(conteudos);
    } catch (erro) {
      console.error("Erro ao pesquisar conteúdos:", erro);
      return res.status(500).json({ erro: "Erro ao realizar a pesquisa." });
    }
  }
};
