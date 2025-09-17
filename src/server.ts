import express from 'express';
// Importar las rutas
import rifasRouter from './rifas/rifas.route.js';
import uploadRouter from './middlewares/upload-files.middleware.js';

// Inicializar la aplicación de Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar la subida de archivos
app.use(uploadRouter);

// Middleware para parsear JSON
app.use(express.json());

// Rutas del sistema de rifas
app.use('/rifas', rifasRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});