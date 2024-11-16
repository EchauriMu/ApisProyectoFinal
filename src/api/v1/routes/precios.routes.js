// routes/precio.routes.js
const { Router } = require('express');
const precioController = require('../controllers/precios.controller');
const router = Router();

// Ruta para obtener todos los precios
router.get('/', precioController.getAllPrecios);

// Ruta para obtener los precios por IdListaOK
router.get('/:idListaOK', precioController.getPreciosByIdListaOK);


module.exports = router;
