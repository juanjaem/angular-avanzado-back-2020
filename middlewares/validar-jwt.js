const jwt = require('jsonwebtoken');



const validarJWT = (req, res, next) => {
    // Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid; // Meter en req el id del usuario que realizó la petición;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};



module.exports = {
    validarJWT
};