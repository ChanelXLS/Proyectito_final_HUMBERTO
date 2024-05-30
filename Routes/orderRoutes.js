const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, orderController.getUserOrders);
// Otras rutas de pedidos según las necesidades del proyecto

module.exports = router;
