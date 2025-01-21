const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");
const verificarToken = require("../middlewares/verificarToken");
const autorizarPermissoes = require("../middlewares/autorizarPermissoes");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista de Usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uma lista de todos os usuários disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get(
  "/",
  verificarToken,
  autorizarPermissoes("professor"),
  usuarioController.principal
);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obter detalhes de um Usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário especificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", verificarToken, usuarioController.unico);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criação de Usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Falha na criação do usuário
 */
router.post(
  "/",
  verificarToken,
  autorizarPermissoes("professor"),
  usuarioController.novo
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualização de Usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Falha na atualização do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
  "/:id",
  verificarToken,
  autorizarPermissoes("professor"),
  usuarioController.atualizar
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclusão de Usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete(
  "/:id",
  verificarToken,
  autorizarPermissoes("professor"),
  usuarioController.deletar
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         tipo_usuario:
 *           type: string
 *           enum: [aluno, professor]
 *     UsuarioInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         tipo_usuario:
 *           type: string
 *           enum: [aluno, professor]
 */

module.exports = router;
