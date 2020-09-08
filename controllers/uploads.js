const path = require("path");
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require("../helpers.js/actualizar-imagen");


// Sube imagenes
const fileUpload = async(req, res = response) => {

    const {tipo, id} = req.params;

    // Validar tipo
    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital'
        });
    }

    // Validar que viene un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
    
    // PROCESAR LA IMAGEN
    const file = req.files.imagen; // Lo mete aquí el middleware 'express-fileupload'
    const nombreCortado = file.name.split('.'); // Para extraer la extensión
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // 1 Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    // 2) Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // 3) Guardar el fichero en la carpeta correspondiente
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // 4) Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    });

    // 5) Actualizar BD
    await actualizarImagen(tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg: 'archivo subido',
        nombreArchivo
    });

};


// Devuelve imagenes 
const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    
    if(!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendfile(pathImg);
};


module.exports = {
    fileUpload,
    retornaImagen
};