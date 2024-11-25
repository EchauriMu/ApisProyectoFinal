// routes/precio.routesEdu.js
const { Router } = require('express');
const precioController = require('../controllers/precios.controllerEduardo');
const router = Router();

// Ruta para obtener todos los precios
router.get('/', precioController.getAllPrecios);

// Ruta para obtener toda la información de la lista de precios por IdListaOK
router.get('/lista/:idListaOK', precioController.getListaPreciosByIdListaOK);


// Ruta para obtener los precios por IdListaOK
router.get('/:idListaOK', precioController.getPreciosByIdListaOK);

//ruta deletar
// Ruta para eliminar una lista de precios por idListaOK
router.delete('/:idListaOK', precioController.deleteListaPrecios);

//crear llista completa nueva
// Ruta para crear lista de precios
router.post('/crear', precioController.createListaPrecios);

// Ruta para actualizar una lista de precios
router.put('/:idListaOK', precioController.updateListaPrecios);


module.exports = router;
