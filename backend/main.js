const express = require('express'); // Importa el módulo Express para crear un servidor web
const productos = require('./data/data.json'); // Importa los datos de productos desde un archivo JSON
const cors = require('cors'); // Importa el módulo CORS para permitir solicitudes desde diferentes orígenes

const app = express(); // Crea una instancia de la aplicación Express
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));

app.disable('x-powered-by'); // Quita la cabecera que dice que la app se desarrolló con express
const PORT = 3000; // Define el puerto en el que se ejecutará el servidor

app.use(cors()); // Middleware para permitir solicitudes desde cualquier origen
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON


// https://localhost:3000/endPointElegido -> /api/productos en este caso
app.get('/api/productos', (req, res) => {
    res.json(productos);
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en Puerto: ${PORT}`);
})
