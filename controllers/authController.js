const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const SECRET_KEY = 'tu_llave_secreta';

exports.register = async (req, res) => {
  const { nombre, direccion, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const [rows] = await pool.query('INSERT INTO clientes (nombre, direccion, password) VALUES (?, ?, ?)', [nombre, direccion, hashedPassword]);
  res.send({ id: rows.insertId });
};

exports.login = async (req, res) => {
  const { nombre, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM clientes WHERE nombre = ?', [nombre]);
  if (rows.length === 0) return res.status(404).send('Usuario no encontrado');
  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send('Contraseña incorrecta');

  const token = jwt.sign({ id: user.id, role: 'client' }, SECRET_KEY, { expiresIn: '24h' });
  res.send({ token });
};

exports.adminLogin = async (req, res) => {
  const { nombre, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM administradores WHERE nombre = ?', [nombre]);
  if (rows.length === 0) return res.status(404).send('Administrador no encontrado');
  const admin = rows[0];
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return res.status(401).send('Contraseña incorrecta');

  const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
  res.send({ token });
};
