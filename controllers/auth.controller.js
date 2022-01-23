const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generarJwt } = require('../helpers/generarJwt');

const loginUsuario = async(req, res) =>{
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        
        if( !usuario ){
            return res.status(400).json({
                msg:'El correo no existe'
            });
        };
        if( !usuario.estado ){
            return res.status(400).json({
                msg:'El usuario no existe'
            });
        };
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg:'La contraseña es invalida'
            });
        }
        // generar JWT
        const token = await generarJwt( usuario.id );

        res.json({
            correo,
            password,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

};

module.exports = {
    loginUsuario
}