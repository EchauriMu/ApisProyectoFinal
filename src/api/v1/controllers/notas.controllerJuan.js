import * as notasServices from '../services/notas.serviceJuan';
import boom from '@hapi/boom';

export const getNotas = async (req, res, next) => {
    const { id } = req.params;
    try {
        const notas = await notasServices.getNotas(id);
        res.json(notas);
    } catch (error) {
        next(error);
    }
};

export const postNotaItem = async (req, res, next) => {
    const { id } = req.params;
    const nuevaNota = req.body;

    try {
        const notaCreada = await notasServices.postNotaItem(id, nuevaNota);
        res.status(201).json(notaCreada);
    } catch (error) {
        next(error);
    }
};


export const putNotaItem = async (req, res, next) => {
    const { id, notaId } = req.params;
    const notaData = req.body;

    try {
        const notaActualizada = await notasServices.putNotaItem(id, notaId, notaData);
        res.status(200).json(notaActualizada);
    } catch (error) {
        next(error);
    }
};

export const eliminarNota = async (req, res, next) => {
    const { id, idNota } = req.params; // Extraemos los parámetros de la URL
    try {
        const resultado = await notasServices.eliminarNota(id, idNota);

        if (!resultado) {
            return res.status(404).json({
                message: `No se encontró la lista con IdListaOK: ${id} o la nota con id: ${idNota}.`
            });
        }

        res.status(200).json({ message: 'Nota eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        next(error);
    }
};