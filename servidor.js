import express from 'express';
import cors from 'cors';
import session from 'express-session';
import router from './rutas.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const app = express();
app.disable('x-powered-by');
app.use(express.json()); // Parseador de JSON

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(router);

const PORT = process.env.PORT || 8081;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}...`);
    });
}

export default app;