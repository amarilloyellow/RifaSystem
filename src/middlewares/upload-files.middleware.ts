import multer from 'multer';
// Importar Router de Express
import { Router } from 'express';
// Importar tipo Request de Express
import type { Request, Response } from 'express';
// Importar Supabase
import supabase from '../config/supabase.js';

const uploadRouter = Router();

// Configuración de multer para manejar la subida de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para subir un archivo
uploadRouter.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
        }

        const { buffer, originalname, mimetype } = req.file;
        const filePath = `public/${Date.now()}-${originalname}`;

        // Subir el archivo a Supabase Storage
        const { data, error } = await supabase.storage
            .from('upload') // Nombre del bucket
            .upload(filePath, buffer, {
                contentType: mimetype,
                upsert: false, // No sobrescribir si ya existe
            });

        if (error) {
            console.error('Error al subir el archivo a Supabase:', error.message);
            return res.status(500).json({ error: 'Error al subir el archivo a Supabase.', details: error.message });
        }

        // Obtener la URL pública del archivo
        const { data: publicUrlData } = supabase.storage
            .from('upload')
            .getPublicUrl(filePath);

        res.json({
            message: 'Archivo subido con éxito.',
            url: publicUrlData.publicUrl,
        });

    } catch (err: any) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ error: 'Error en el servidor.', details: err.message });
    }
});


export default uploadRouter;
