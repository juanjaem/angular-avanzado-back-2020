require('dotenv').config(); // Añadimos a las variables globales de node las que se encuentran en el fichero ".env"

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config'); // Las llaves son para desestructurar

// Crear el servidor de express
const app = express();

app.use( cors() ); // Middleware. Enable All CORS Requests

app.use( express.json() ); // Lectura y parseo del body

dbConnection(); // Conectar a la BBDD

// Directorio público
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});