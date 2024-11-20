// Importación de módulos necesarios
import { Router } from 'express';
import config from '../../../config/config';

// Importación de rutas de precios
import preciosRoutes from './precios.routesEduardo';
import preciosRoutesMiguel from './precios.routesMiguel'
import alertasRoutes from './alertas.routesGERA';
import preciosHistorial from './historial.routesCARLOS.js';
import promocionesRoutesSebas from './promociones.routesSebas';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;  // Obtener la URL base desde la configuración
  app.use(api, router);  // Aplicar el prefijo base a todas las rutas

  // Definir las rutas
  router.use('/listas-precios', preciosRoutes);  // Ruta de precios DE EDUARDO
  router.use('/listas-precios', preciosRoutesMiguel);  // Ruta de precios DE MIGUEL
 


  //rutas de alertas
  router.use('/listas-precios', alertasRoutes);


 // Definir las rutas para historial CARLOS

 router.use('/historial', preciosHistorial); //RUTAS DE CARLOS



 //definir rutas para las pais de sebas
   router.use('/listas-precios', promocionesRoutesSebas);  // Ruta de promociones


  return router;

 
};

module.exports = routerAPI;  // Exportación del router
