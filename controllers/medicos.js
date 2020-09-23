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


const getMedicoById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }
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


const actualizarMedico = async(req, res = response) => {
    const medico_id = req.params.id; // ID del medico que actualizar
    const hospital_id = req.body.hospital; // ID del hospital al que debe pertenecer el médico
    const uid = req.uid; // ID del usuario que hace la peticion

    try {
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del hospital indicado no es válido'
            });
        }

        const medico = await Medico.findById(medico_id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del medico indicado no es válido'
            });
        }

        medico.nombre = req.body.nombre;
        medico.hospital = hospital_id;
        medico.usuario = uid;

        const medicoActualizado = await Medico.findByIdAndUpdate(medico_id, medico, {new: true});
    
        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const borrarMedico = async(req, res = response) => {
    const medico_id = req.params.id; // ID del medico a borrar

    try {
        const medico = await Medico.findById(medico_id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del medico indicado no es válido'
            });
        }

        await Medico.findByIdAndDelete(medico_id);
    
        res.json({
            ok: true,
            msg: 'El médico ha sido borrado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    getMedicos,
    crarMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};