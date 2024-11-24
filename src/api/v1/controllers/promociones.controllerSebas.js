const cat_precios = require('../models/Precios');

// Obtener promociones por IdListaOK
exports.getPromociones = async (req, res) => {
  try {
    const { id } = req.params; // IdListaOK

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({
      IdListaOK: id
    });

    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de precios no encontrada' });
    }

    res.status(200).send(listaPrecio.promociones);
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};

// Crear una nueva promoción por IdListaOK
exports.postPromocion = async (req, res) => {
  try {
    const { id } = req.params; // IdListaOK
    const { tipo, descuento, condicion, usuario } = req.body;

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({ IdListaOK: id });
    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de promociones no encontrada' });
    }

    // Obtener el ID máximo de las promociones existentes
    const promociones = listaPrecio.promociones;

    // Calcular el ID máximo solo si hay promociones
    const maxId = promociones.length > 0 
      ? Math.max(...promociones.map(promo => parseInt(promo._id) || 0)) // Aseguramos que el valor sea un número
      : 0;
    
    const nuevaPromocion = {
      _id: (maxId + 1).toString(), // Crear un nuevo ID basado en el máximo encontrado
      Activo: 'S',
      tipo,
      descuento,
      condicion,
      detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: usuario }]
    };

    listaPrecio.promociones.push(nuevaPromocion);
    await listaPrecio.save();
    res.status(201).send(nuevaPromocion);
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};

// Modificar una promoción existente por IdListaOK y idPromocion
exports.putPromocion = async (req, res) => {
  try {
    const { id, idPromocion } = req.params; // IdListaOK y id de la promoción
    const { Activo, tipo, descuento, condicion } = req.body;

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({ IdListaOK: id });
    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de promociones no encontrada' });
    }

    // Buscamos la promoción dentro de la lista de precios
    const promocion = listaPrecio.promociones.id(idPromocion);
    if (!promocion) {
      return res.status(404).send({ message: 'Promoción no encontrada' });
    }

    // Actualizamos los campos de la promoción
    promocion.Activo = Activo || promocion.Activo;
    promocion.tipo = tipo || promocion.tipo;
    promocion.descuento = descuento || promocion.descuento;
    promocion.condicion = condicion || promocion.condicion;

    // Guardamos los cambios
    await listaPrecio.save();

    res.status(200).send({
      message: 'Promoción actualizada exitosamente',
      promocion,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};


// Eliminar una promoción específica por IdListaOK y idPromocion
exports.deletePromocion = async (req, res) => {
  try {
    const { id, idPromocion } = req.params; // IdListaOK y id de la promoción

    // Usamos el servicio para eliminar la promoción
    const listaActualizada = await cat_precios.findOneAndUpdate(
      { IdListaOK: id },
      { $pull: { promociones: { _id: idPromocion } } },
      { new: true }
    );

    if (!listaActualizada) {
      return res.status(404).send({ message: 'Lista de precios o promoción no encontrada' });
    }

    res.status(200).send({
      message: 'Promoción eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};