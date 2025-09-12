import express from 'express';
// Importar las rutas
import rifasRouter from './rifas/rifas.route.js';

// Inicializar la aplicación de Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas del sistema de rifas
app.use('/rifas', rifasRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});