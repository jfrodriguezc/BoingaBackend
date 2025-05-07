import mysql from 'mysql2/promise'; //instancia de mysql con el wrapper de promesas
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno

//se crea un pool de conexiones para optimizar la app
const config = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // grupo limitado de conexiones
    queueLimit: 0 
    // No hay límite en la cantidad de consultas que pueden esperar por una conexión disponible
})

export const conexionDB = async () => {
  try {
    const connection = await config.getConnection();
    console.log('Conexión a la base de datos (pool) exitosa.');
    return connection;
  } catch (err) {
    console.error('Error al obtener una conexión del pool:', err);
    throw err;
  }
};