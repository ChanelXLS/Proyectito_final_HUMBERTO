const pool = require('../config/db');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await pool.query('SELECT * FROM Usuarios WHERE rol = "cliente"');
    res.json(clients);
  } catch (error) {
    res.status(500).send('Error fetching clients');
  }
};

// Otros controladores según las necesidades del proyecto
