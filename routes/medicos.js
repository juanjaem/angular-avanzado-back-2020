/*
    Path: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crarMedico, actualizarMedico, borrarMedico } = require('../controllers/Medicos');

const router = Router();


// OBTENER MEDICOS
router.get('/', getMedicos);


// CREAR MEDICOS
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital_id', 'El id del hospital debe de ser válido').isMongoId(),
        validarCampos
    ],
    crarMedico
);


// MODIFICAR MEDICOS
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe de ser válido').isMongoId(),
    ],
    actualizarMedico
 );


 // BORRAR MEDICOS
router.delete('/:id', validarJWT, borrarMedico);


module.exports = router;