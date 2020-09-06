const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});


// Solo para fines educativos
// Es una especie de middleware que cambia el nombre "_id" a "uid".En la BD se sigue almacenando "_id".
// También podria usarse para ocultar o cambiar otras propiedades del objeto
UsuarioSchema.methods.toJSON = function() {
    // Usamos una funcion normal en vez de una funcion de flecha para que el 'this' apunte dentro de la funcion. Si fuera una funcion
    // de flecha, apuntaría fuera de la función
    const {__v, _id, password, ...object} = this.toObject(); // Destructuramos: '__v','_id' y password por un lado, y el resto del objeto en 'object'
    object.uid = _id; // añadimos el campo uid al objeto con el valor del _id
    return object;
};


module.exports = model('Usuario', UsuarioSchema);