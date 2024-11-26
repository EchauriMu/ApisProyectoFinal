import { Router } from 'express';
import * as notasController from '../controllers/notas.controllerJuan';
const router = Router();

//GET NOTAS
router.get('/:id/notas', notasController.getNotas);
//POST NOTA ITEM
router.post('/:id/notas', notasController.postNotaItem);
//PUT NOTA ITEM
router.put('/:id/notas/:notaId', notasController.putNotaItem);
// DELETE NOTA ITEM
router.delete('/:id/notas/:idNota', notasController.eliminarNota);

export default router;