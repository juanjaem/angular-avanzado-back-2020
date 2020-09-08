const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {                          // El usuario que creó el hospital
        type: Schema.Types.ObjectId,    // Será del tipo Usuario (modelo que ya creamos)
        ref: 'Usuario',
        required: true
    }
},
{   
    collection: 'hospitales' // Asignamos manualmente el nombre de la colección. De lo contrario pondría 'hospitals'
});




module.exports = model('Hospital', HospitalSchema);