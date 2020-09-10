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


const actualizarHospital = async(req, res = response) => {
    const hospital_id = req.params.id; // id del hospital a actualizar
    const uid = req.uid; // id del usuario que hace la peticion

    try {
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            }); 
        }

        const cambiosHospital = {
              ...req.body,
              usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospital_id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const borrarHospital = async(req, res = response) => {
    const hospital_id = req.params.id; // id del hospital a actualizar

    try {
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            }); 
        }

        await Hospital.findByIdAndDelete(hospital_id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crarHospital,
    actualizarHospital,
    borrarHospital 
};