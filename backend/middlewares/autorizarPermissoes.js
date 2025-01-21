module.exports = function autorizarPermissoes(...rolesPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!rolesPermitidos.includes(usuario.tipo_usuario)) {
      return res
        .status(403)
        .json({ erro: "Acesso negado. Permissão insuficiente." });
    }

    next();
  };
};
