
// controllers/precio.controller.js
const precioService = require('../services/precios.serviceEduardo');
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

exports.updateListaPrecios = async (req, res) => {
  try {
    const { idListaOK } = req.params;
    const { desLista, fechaExpiraIni, fechaExpiraFin, detail_row, detail_row_reg } = req.body;

    // Construir el objeto de actualización
    const updateFields = {
      DesLista: desLista,
      FechaExpiraIni: fechaExpiraIni,
      FechaExpiraFin: fechaExpiraFin,
      ...(detail_row && { "detail_row.Activo": detail_row.Activo, "detail_row.Borrado": detail_row.Borrado }),
      ...(detail_row_reg && { "detail_row.detail_row_reg": detail_row_reg })
    };

    // Llamar al servicio para actualizar
    const updatedLista = await precioService.updateListaPrecios(idListaOK, updateFields);

    if (!updatedLista) {
      return res.status(404).json({ message: `No se encontró la lista de precios con idListaOK: ${idListaOK}` });
    }

    res.status(200).json(updatedLista);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la lista de precios.', error: error.message });
  }
};



// Función para obtener toda la información de la lista de precios por IdListaOK
exports.getListaPreciosByIdListaOK = async (req, res, next) => {
  const { idListaOK } = req.params; // Obtenemos el IdListaOK desde los parámetros de la URL

  try {
    // Llamamos al servicio para obtener toda la información de la lista de precios
    const listaPrecio = await precioService.getListaPreciosByIdListaOK(idListaOK);
    
    if (!listaPrecio) {
      // Si no se encuentra la lista, devolvemos un error 404
      throw boom.notFound('No se encontró la lista de precios con el IdListaOK proporcionado.');
    }
    
    // Si se encuentra la lista de precios, la enviamos en la respuesta
    res.status(200).json(listaPrecio);
  } catch (error) {
    // Pasamos cualquier error al middleware de manejo de errores
    next(error);
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


// NUEVO: Función para crear una nueva lista de precios
exports.createListaPrecios = async (req, res, next) => {
  try {
    const datosLista = req.body; // Los datos de la lista de precios vienen en el cuerpo de la solicitud

    // Llamamos al servicio para crear la nueva lista de precios
    const resultado = await precioService.createListaPrecios(datosLista);

    // Si todo sale bien, respondemos con un mensaje de éxito
    res.status(201).json({
      message: 'Lista de precios creada correctamente.',
      result: resultado,
    });
  } catch (error) {
    next(error); // Pasa cualquier error al middleware de manejo de errores
  }
};


//api para deletr la lista completa seleccionada
// Controlador para eliminar una lista de precios por idListaOK
exports.deleteListaPrecios = async (req, res, next) => {
  try {
    const { idListaOK } = req.params; // Obtenemos el idListaOK de los parámetros de la ruta

    // Llamamos al servicio para eliminar la lista
    const result = await precioService.deleteListaPrecios(idListaOK);

    if (!result) {
      throw boom.notFound(`No se encontró la lista de precios con idListaOK: ${idListaOK}`);
    }

    res.status(200).json({
      message: `Lista de precios con idListaOK: ${idListaOK} eliminada correctamente`,
      result,
    });
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};



