// Importación de módulos necesarios
import { Router } from 'express';
import config from '../../../config/config';

// Importación de rutas de precios
import preciosRoutes from './precios.routesEduardo';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;  // Obtener la URL base desde la configuración
  app.use(api, router);  // Aplicar el prefijo base a todas las rutas

  // Definir las rutas
  router.use('/listas-precios', preciosRoutes);  // Ruta de precios

  return router;
};

module.exports = routerAPI;  // Exportación del router
