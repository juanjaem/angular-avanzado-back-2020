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


// OBTENER MEDICOS
router.put('/:id',
    [
      
    ],
    actualizarMedico
 );


 // BORRAR MEDICOS
router.delete('/:id', borrarMedico);


module.exports = router;