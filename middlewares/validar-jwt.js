const { request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");

const validarJwt = async(req = request, res, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    };

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        
        // Obteniendo el usuario que se mando en el header x-token
        const usuarioAutenticado = await Usuario.findById( uid );

        // Validar que no sea undenfined usuarioAutenticado
        if(!usuarioAutenticado){
            return res.status(400).json({
                msg: 'Token no valido'
            });
        }

        // Verificar que el usuario tenga estado true
        if( !usuarioAutenticado.estado ){
            return res.status(400).json({
                msg:'Token no valido - usuario no autenticado'
            })
        }
        // Estableciendo en la request el usuario logiado
        req.usuario = usuarioAutenticado; 

        return next();
    } catch (error) {
        res.status(401).json({
            msg:'Token no es valido'
        })
    }

};

module.exports = {
    validarJwt
}