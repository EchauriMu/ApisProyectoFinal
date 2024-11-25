import Precios from '../models/Precios';

// services/precio.serviceEdu.js
const Precio = require('../models/Precios'); // Asegúrate de que el modelo esté correcto

export const getAllPrecios = async () => {
  try {
    // Encontrar todos los documentos y muestro los campos que queremos
    const precios = await Precio.find({}, {
      IdInstitutoOK: 1,
      IdListaOK: 1,
      IdListaBK: 1,
      DesLista: 1,
      FechaExpiraIni: 1,
      FechaExpiraFin: 1,
      IdTipoListaOK: 1,
      IdTipoGeneraListaOK: 1,
      IdTipoFormulaOK: 1
    });

    return precios;
  } catch (error) {
    throw new Error('Error al obtener los precios: ' + error.message);
  }
};

// Función para obtener toda la información de la lista de precios por IdListaOK
export const getListaPreciosByIdListaOK = async (idListaOK) => {
  try {
    // Buscamos el documento en la colección "Precios" donde IdListaOK coincida
    const listaPrecio = await Precios.findOne({ 'IdListaOK': idListaOK }, {
      IdInstitutoOK: 1,
      IdListaOK: 1,
      IdListaBK: 1,
      DesLista: 1,
      FechaExpiraIni: 1,
      FechaExpiraFin: 1,
      IdTipoListaOK: 1,
      IdTipoGeneraListaOK: 1,
      IdTipoFormulaOK: 1,
      
    });

    // Verificamos si se encontró la lista de precios
    if (!listaPrecio) {
      throw new Error('Lista de precios no encontrada.');
    }

    // Retornamos toda la información de la lista de precios
    return listaPrecio;
  } catch (error) {
    throw new Error('Error al obtener la lista de precios: ' + error.message);
  }
};


// Función para obtener la lista precios por IdListaOK
export const getPreciosByIdListaOK = async (idListaOK) => {
  try {
    // Buscamos el documento en la colección "cat_precios" donde IdListaOK coincida
    const listaPrecio = await Precios.findOne({ 'IdListaOK': idListaOK }, {
      precios: 1,  // Solo seleccionamos el campo "precios"
    });

    // Verificamos si se encontró la lista de precios
    if (!listaPrecio) {
      throw new Error('Lista de precios no encontrada.');
    }

    // Retornamos los precios del subdocumento "precios"
    return listaPrecio.precios;
  } catch (error) {
    throw new Error('Error al obtener los precios: ' + error.message);
  }
};




// Función para crear una nueva lista de precios
export const createListaPrecios = async (datosLista) => {
  try {
    // Crear una nueva instancia del modelo Precios con los datos proporcionados
    const nuevaLista = new Precios(datosLista);

    // Guardar la nueva lista de precios en la base de datos
    await nuevaLista.save();
    
    return nuevaLista; // Devolvemos la lista de precios recién creada
  } catch (error) {
    throw new Error('Error al crear la lista de precios: ' + error.message);
  }
};


// Servicio para eliminar una lista de precios por idListaOK
export const deleteListaPrecios = async (idListaOK) => {
  try {
    // Usamos el modelo para buscar y eliminar la lista
    const result = await Precio.findOneAndDelete({ IdListaOK: idListaOK });

    return result; // Retornamos el resultado (o null si no se encontró)
  } catch (error) {
    throw new Error(`Error al eliminar la lista de precios: ${error.message}`);
  }
};
