const {response} = require('express');
const { generarJWT } = require('../helpers.js/jwt');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

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
           token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    login
};