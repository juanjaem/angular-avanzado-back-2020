const {response} = require('express');
const { generarJWT } = require('../helpers.js/jwt');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers.js/google-verify');

const login = async(req, res = response) => {
    const {email, password} = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos no válidos (email no válido)' // Email no válido
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos no válidos (password incorrecto)' // Password incorrecto
            });
        }

        // Generar token
        const token = await generarJWT(usuarioDB.id);

        
        res.json({
           ok: true,
           token,
           usuarioDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const gogleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;

    try {
        // Comprobar el token recibido
        const {name, email, picture} = await googleVerify(googleToken);
        
        // Verificar si el usuario ya existe. Podría haberse registrado o bien por
        // google, o bien por correo. No importa
        let usuario;
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            usuario = new Usuario({
                // no existe el usuario. Lo crearemos.
                // TODO: Que el usuario pueda añadir más adelante una contraseña, para así poder loguearse también por el otro método
                nombre: name,
                email,
                password: '@@@', // Lo ponemos porque está como obligatorio, pero no valdrá para nada xk debería estár encriptado con bcryt
                img: picture,
                google: true
            });
        } else {
            // Existe el usuario. Vamos a marcarlo como usuario de google, por si no lo estaba.
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en la BD (si ya existía, guardará los cambios)
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto'
        });
    }
};


// Devuelve un nuevo token, utilizando uno viejo para autenticar. Si el token viejo está expirado, no podrá
// entrar aquí
const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // Generar token
    const token = await generarJWT(uid);

    // Cargar datos del usuario
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario
    });
};


module.exports = {
    login,
    gogleSignIn,
    renewToken
};