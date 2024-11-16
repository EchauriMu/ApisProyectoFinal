import * as preciosServices from '../services/precios.service';

//MALR: API GET
// controllers/precio.controller.js
const precioService = require('../services/precios.service');
const boom = require('@hapi/boom');

exports.getAllPrecios = async (req, res, next) => {
  try {
    const precios = await precioService.getAllPrecios();
    if (!precios || precios.length === 0) {
      throw boom.notFound('No se encontraron precios en la base de datos.');
    }
    res.status(200).json(precios);
  } catch (error) {
    next(error); // Esto pasará el error al middleware de manejo de errores
  }
};


// Función para obtener los precios por IdListaOK
exports.getPreciosByIdListaOK = async (req, res, next) => {
  const { idListaOK } = req.params; // Obtenemos el IdListaOK desde los parámetros de la URL

  try {
    // Llamamos al servicio para obtener los precios filtrados por el IdListaOK
    const precios = await precioService.getPreciosByIdListaOK(idListaOK);
    
    if (!precios || precios.length === 0) {
      // Si no se encuentran precios, devolvemos un error 404
      throw boom.notFound('No se encontraron precios con el IdListaOK proporcionado.');
    }
    
    // Si se encuentran precios, los enviamos en la respuesta
    res.status(200).json(precios);
  } catch (error) {
    // Pasamos cualquier error al middleware de manejo de errores
    next(error);
  }
};
