const express = require('express'); // Importa el módulo Express para crear un servidor web
const { Pool } = require('pg'); // NUEVO: cliente de PostgreSQL (reemplaza al require del data.json)
const cors = require('cors'); // Importa el módulo CORS para permitir solicitudes desde diferentes orígenes

// NUEVO: conexión a la base de datos
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.PGPASSWORD, // Se lee de una variable de entorno
    database: 'ecommerce'
});

const app = express(); // Crea una instancia de la aplicación Express
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));

app.disable('x-powered-by'); // Quita la cabecera que dice que la app se desarrolló con express
const PORT = 3000; // Define el puerto en el que se ejecutará el servidor

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON


// https://localhost:3000/endPointElegido -> /api/productos en este caso
// NUEVO: ahora consulta la tabla en vez de devolver el JSON
app.get('/api/productos', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM productos ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en Puerto: ${PORT}`);
    // NUEVO: verifica la conexión al arrancar
    pool.query('SELECT 1')
        .then(() => console.log('Conectado a PostgreSQL'))
        .catch(err => console.error('Error conectando a PostgreSQL:', err.message));
})