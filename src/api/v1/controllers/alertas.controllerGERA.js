import * as preciosServices from '../services/alertas.serviceGERA';
import boom from '@hapi/boom';

export const getAlertas = async (req, res, next) => {
  const { id } = req.params;
  try {
    const alertas = await preciosServices.getAlertas(id);
    res.json(alertas);
  } catch (error) {
    next(error);
  }
};

export const postAlertaItem = async (req, res, next) => {
  const { id } = req.params;
  const nuevaAlerta = req.body;

  try {
    const alertaCreada = await preciosServices.postAlertaItem(id, nuevaAlerta);
    res.status(201).json(alertaCreada);
  } catch (error) {
    next(error);
  }
};

export const postAlertasList = async (req, res, next) => {
  const { id } = req.params;
  const alertasList = req.body;

  try {
    const alertasCreadas = await preciosServices.postAlertasList(id, alertasList);
    res.status(201).json(alertasCreadas);
  } catch (error) {
    next(error);
  }
};

export const putAlertasItem = async (req, res, next) => {
  const { id, alertaId } = req.params;
  const alertaData = req.body;

  try {
    const alertaActualizada = await preciosServices.putAlertasItem(id, alertaId, alertaData);
    res.status(200).json(alertaActualizada);
  } catch (error) {
    next(error);
  }
};

// Controlador para eliminar una alerta
export const eliminarAlerta = async (req, res) => {
  try {
    const { id, idAlerta } = req.params; // Extraemos los parámetros de la URL

    const resultado = await preciosServices.eliminarAlerta(id, idAlerta);

    if (!resultado) {
      return res.status(404).json({
        message: `No se encontró la lista con IdListaOK: ${id} o la alerta con _id: ${idAlerta}.`
      });
    }

    res.status(200).json({ message: 'Alerta eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    res.status(500).json({ message: 'Error al eliminar la alerta.', error });
  }
};