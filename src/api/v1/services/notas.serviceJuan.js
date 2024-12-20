import Precios from '../models/Precios';
import boom from '@hapi/boom';

export const getNotas = async (id) => {
    try {
        const listaPrecios = await Precios.findOne({ 'IdListaOK': id });
        if (!listaPrecios) {
            throw boom.notFound('Lista de precios no encontrada');
        }
        return listaPrecios.notas;
    } catch (error) {
        throw boom.internal(error);
    }
};

export const postNotaItem = async (id, nuevaNota) => {
    try {
        const listaPrecios = await Precios.findOne({ IdListaOK: id });
        if (!listaPrecios) {
            throw boom.notFound('Lista de precios no encontrada');
        }
        listaPrecios.notas.push(nuevaNota);

        await listaPrecios.save();

        return nuevaNota;
    } catch (error) {
        throw boom.internal(error);
    }
};


export const putNotaItem = async (id, notaId, notaData) => {
    try {
        const listaPrecios = await Precios.findOne({ IdListaOK: id });
        if (!listaPrecios) {
            throw boom.notFound('Lista de precios no encontrada');
        }

        const notaIndex = listaPrecios.notas.findIndex(nota => nota._id === notaId);
        if (notaIndex === -1) {
            throw boom.notFound('Nota no encontrada');
        }

        listaPrecios.notas[notaIndex] = { ...listaPrecios.notas[notaIndex], ...notaData };
        await listaPrecios.save();

        return listaPrecios.notas[notaIndex];
    } catch (error) {
        throw boom.internal(error);
    }
};

export const eliminarNota = async (idLista, idNota) => {
    try {
        const listaActualizada = await Precios.findOneAndUpdate(
            { IdListaOK: idLista }, // Filtra por IdListaOK
            { $pull: { notas: { _id: idNota } } }, // Elimina la nota específica
            { new: true } // Devuelve la lista actualizada
        );

        if (!listaActualizada) {
            throw boom.notFound('Lista de precios o nota no encontrada');
        }

        return listaActualizada;
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        throw boom.internal(error);
    }
};