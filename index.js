 //El plugin 'dotenb' se encarga de meter en las variables globales lo que definamos en el fichero .env
 //Al subirlo a Heroku, la variable global PORT la sobreescribirá el servidor, utilizando la que necesita
require('dotenv').config();
const path = require('path');

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


// Para solucionar el problema que ocurre al recargar la webApp, usamos esto.
app.get('*', (req, res) => { // Si no es ninguna de las rutas anteriores entrará en esta
    res.sendFile( path.resolve(__dirname, 'public/index.html') );
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});