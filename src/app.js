import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { mongoose } from './config/database.config';

//: imports Swagger
//Edu.v: imports Routes
import routeAPI from './api/v1/routes/index';
//m
import config from './config/config';

const app = express();

app.set('port', config.PORT);
// Middlewares generales
app.use(cors());
app.use(morgan('dev'));

//por esto acepta jsons xdd
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
// Routes
routeAPI(app);
const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>RESTful running in root</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
app.get('/EDU', (req,res)=>{
    res.send(
        `<h1>RESTful running in MALR</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
// Routes
// Swagger Docs
// Middleware para el manejo de errores
// Export App
export default app;