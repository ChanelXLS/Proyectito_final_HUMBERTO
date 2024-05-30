const jwt = require('jsonwebtoken');
const SECRET_KEY = 'datePILIN'; //la secret key

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send('Token inválido');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = verifyToken;
