const {response} = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
};


const crarMedico = async(req, res = response) => {
    const uid = req.uid; // El middleware metió esto aquí
    const hospital_id = req.body.hospital_id;
    
    try {
        const hospital = await Hospital.findById(hospital_id);

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del hospital indicado no es válido'
            });
        }
    
        const medico = new Medico({
            usuario: uid,               // Desestructurar para pasar el usuario y todo lo que venga en el body
            hospital: hospital_id,   // todo lo que el modelo no necesita lo deshecha
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
};


module.exports = {
    getMedicos,
    crarMedico,
    actualizarMedico,
    borrarMedico 
};