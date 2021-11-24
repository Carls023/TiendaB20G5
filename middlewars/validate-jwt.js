const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("token");

    if(!token){
        return res.status(401).json({
            msg: "Se requiere autenticacion"
        })
    }

    try{
        const { userId } = jwt.verify(token, process.env.SECRECTKEY);

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({
                msg: "El token no es valido - Id no valido"
            })
        }

        if(!user.status){
            return res.status(401).json({
                msg: "El token no es valido - User no activo"
            })
        }

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({ msg: "El token no es valido"});
    }
}

module.exports = {
    validateJWT
}