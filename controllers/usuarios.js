const {response} = require('express');
const { generarJWT } = require('../helpers.js/jwt');
const bcrypt = require('bcryptjs');
 
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0; // Si no se manda número, será 0

    // PROMISE.ALL -> Para que se ejecuten todos los querys simultaneamente (son asincronos), y espere a que terminen todos
    // Los resultados se meten en el array en el orden elegido
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img').skip(desde).limit(5), // funcion asíncrona 1
        Usuario.countDocuments()                                                    // funcion asíncrona 2
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
};


const crearUsuario = async(req, res = response) => { // Asignamos res = response para que vscode nos haga sugerencias
    const {email, password} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está resgistrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

 
};


const actualizarUsuario = async(req, res = resonse) => {
    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            }); 
        }

        // Actualizar usuario. No queremos actualizar ni password, ni google
        const {password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json( {
            ok: true,
            usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        }); 
    }
};


const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            }); 
        }

        await Usuario.findByIdAndDelete(uid);

        res.json( {
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: 'Error al borrar el usuario'
        });  
    }
};


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};