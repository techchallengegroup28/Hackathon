const express = require("express");
const router = express.Router();
const conteudoController = require("../controller/conteudoController");
const verificarToken = require("../middlewares/verificarToken");
const autorizarPermissoes = require("../middlewares/autorizarPermissoes");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname}`;
    cb(null, nomeArquivo);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Conteúdos
 *   description: Gerenciamento de conteúdos
 */

/**
 * @swagger
 * /conteudos:
 *   get:
 *     summary: Lista de Conteúdos
 *     tags: [Conteúdos]
 *     responses:
 *       200:
 *         description: Uma lista de todos os conteúdos disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conteudo'
 */
router.get("/", conteudoController.principal);

/**
 * @swagger
 * /conteudos/admin:
 *   get:
 *     summary: Listagem de Todos os Conteúdos (Visão Administrativa)
 *     tags: [Conteúdos]
 *     responses:
 *       200:
 *         description: Uma lista de todos os conteúdos criados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conteudo'
 */
router.get(
  "/admin",
  verificarToken,
  autorizarPermissoes("professor"),
  conteudoController.admin
);

/**
 * @swagger
 * /conteudos/pesquisar:
 *   get:
 *     summary: Busca de Conteúdos
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: query
 *         name: buscar
 *         required: true
 *         description: Termo de busca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de conteúdos que contêm o termo de busca no título ou conteúdo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conteudo'
 */
router.get("/pesquisar", conteudoController.pesquisa);

/**
 * @swagger
 * /conteudos/{id}:
 *   get:
 *     summary: Leitura de Conteúdos
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do conteúdo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conteúdo completo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conteudo'
 *       404:
 *         description: Conteúdo não encontrado
 */
router.get("/:id", conteudoController.unico);

/**
 * @swagger
 * /conteudos:
 *   post:
 *     summary: Criação de Conteúdos
 *     tags: [Conteúdos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               texto_conteudo:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: base64
 *               link_youtube:
 *                 type: string
 *               arquivo:
 *                 type: file
 *                 description: Arquivo a ser enviado
 *               saiba_mais:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso
 *       400:
 *         description: Conteúdo não criado! Faltam dados.
 */
router.post(
  "/",
  verificarToken,
  autorizarPermissoes("professor"),
  upload.single("arquivo"),
  conteudoController.novo
);

/**
 * @swagger
 * /conteudos/{id}:
 *   put:
 *     summary: Edição de Conteúdos
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do conteúdo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               texto_conteudo:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: base64
 *               link_youtube:
 *                 type: string
 *               arquivo:
 *                 type: file
 *                 description: Arquivo a ser enviado
 *               saiba_mais:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conteúdo atualizado com sucesso
 */
router.put(
  "/:id",
  verificarToken,
  autorizarPermissoes("professor"),
  upload.single("arquivo"),
  conteudoController.atualizar
);

/**
 * @swagger
 * /conteudos/{id}:
 *   delete:
 *     summary: Exclusão de Conteúdos
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do conteúdo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conteúdo excluído com sucesso
 */
router.delete(
  "/:id",
  verificarToken,
  autorizarPermissoes("professor"),
  conteudoController.deletar
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Conteudo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         data_postagem:
 *           type: string
 *           format: date-time
 *         data_atualizacao:
 *           type: string
 *           format: date-time
 *         texto_conteudo:
 *           type: string
 *         imagem:
 *           type: string
 *           format: binary
 *         link_youtube:
 *           type: string
 *         nome_documento:
 *           type: string
 *         saiba_mais:
 *           type: string
 */

module.exports = router;
