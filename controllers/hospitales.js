const {response} = require('express');

const Hospital = require("../models/hospital");


const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img',);

    res.json({
        ok: true,
        hospitales
    });
};


const crarHospital = async(req, res = response) => {
    const uid = req.uid; // El middleware metió esto aquí
    const hospital = new Hospital({
        usuario: uid,   // Desestructurar para pasar el usuario y todo lo que venga en el body
        ...req.body     // Todo lo que el modelo no necesita lo deshecha
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};


module.exports = {
    getHospitales,
    crarHospital,
    actualizarHospital,
    borrarHospital 
};