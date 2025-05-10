const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');
const menuController = require('../controllers/menu.controller');

router.get('/', verifyToken, menuController.showMenu);

module.exports = router;
