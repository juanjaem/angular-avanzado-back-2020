/*
    Path: '/api/login'
*/

const {Router} = require('express');
const {login, gogleSignIn} = require('../controllers/auth');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

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






module.exports = router;