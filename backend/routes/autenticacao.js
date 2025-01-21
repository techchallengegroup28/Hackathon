const express = require("express");
const router = express.Router();
const autenticacaoController = require("../controller/autenticacaoController");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de autenticação de usuários
 */

/**
 * @swagger
 * /autenticacao/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", autenticacaoController.realizarLogin);

/**
 * @swagger
 * /autenticacao/renovar-token:
 *   post:
 *     summary: Atualização do Token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT atual
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: Novo token JWT
 *       400:
 *         description: Token não fornecido
 *       401:
 *         description: Token inválido ou expirado
 */
router.post("/renovar-token", autenticacaoController.renovarToken);

module.exports = router;
