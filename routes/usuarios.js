/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');

const router = Router();


// OBTENER USUARIOS
router.get('/', validarJWT, getUsuarios);


// CREAR USUARIO
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Formato de email incorrecto').isEmail(),
        validarCampos
    ],
    crearUsuario
);


// OBTENER USUARIOS
router.put('/:id',
    [
        // middlewares
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Formato de email incorrecto').isEmail(),
        validarCampos
    ],
    actualizarUsuario
 );


 // BORRAR USUARIOS
router.delete('/:id', validarJWT, borrarUsuario);


module.exports = router;