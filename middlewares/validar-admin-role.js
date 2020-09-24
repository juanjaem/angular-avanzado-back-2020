const Usuario = require('../models/usuario');


const validarADMIN_ROLE = async(req, res, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto'
            });
        }
        
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const validarADMIN_ROLE_o_mismoUsuario= async(req, res, next) => {
    const uid = req.uid;
    const id_target = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id_target) {
            // Continuar si se trata de administrador o está editando su propio perfil
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto'
            });
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};




module.exports = {
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUsuario
};