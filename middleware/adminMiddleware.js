module.exports = (req, res, next) => {
    if (req.user.rol !== 'admin') return res.status(403).send('Rol de administrador requerido!');
    next();
  };
  