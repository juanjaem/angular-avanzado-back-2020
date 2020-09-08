const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

// Borra el fichero de la url que se le pase
const borrarImagen = (path) => {
    if( fs.existsSync(path) ){
        fs.unlinkSync(path);
    }
};


const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo;

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico) {
                console.log('No se encontró medico por ID');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo; // Guardar en el campo img del médico el nombre de la imagen
            await medico.save();
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital) {
                console.log('No se encontró hospital por ID');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario) {
                console.log('No se encontró usuario por ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            break;
    
        default:
        break;
    }

    return true;

};


module.exports = {
    actualizarImagen
};