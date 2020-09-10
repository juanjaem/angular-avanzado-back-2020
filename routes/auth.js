/*
    Path: '/api/login'
*/

const {Router} = require('express');
const {login, gogleSignIn, renewToken} = require('../controllers/auth');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Formato de email incorrecto').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);


router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    gogleSignIn
);


router.get('/renew', validarJWT, renewToken);




module.exports = router;