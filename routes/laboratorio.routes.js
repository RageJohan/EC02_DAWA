const express = require('express');
const router = express.Router();
const controller = require('../controllers/laboratorio.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

// Rutas públicas o protegidas según necesidad
router.get('/', verifyToken, controller.findAll); // Todos los usuarios autenticados pueden ver
router.get('/:id', verifyToken, controller.findOne); // Ver un laboratorio

// Solo administradores pueden crear, actualizar y eliminar
router.post('/', verifyToken, isAdmin, controller.create);
router.put('/:id', verifyToken, isAdmin, controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.delete);

module.exports = router;
