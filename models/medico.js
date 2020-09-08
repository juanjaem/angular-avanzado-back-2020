const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
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
    },
    hospital: {                         // El hospital al que pertenece el médico
        type: Schema.Types.ObjectId,    // Será del tipo Hospital (modelo que ya creamos)
        ref: 'Hospital',
        required: true
    }
});



module.exports = model('Medico', MedicoSchema);