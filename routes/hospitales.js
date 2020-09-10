/*
    Path: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crarHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();


// OBTENER USUARIOS
router.get('/', getHospitales);


// CREAR USUARIO
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crarHospital
);


// OBTENER USUARIOS
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
 );


 // BORRAR USUARIOS
router.delete('/:id', validarJWT, borrarHospital);


module.exports = router;