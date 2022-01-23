const { response } = require("express");
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const obtenerUsuarios = async(req, res = response) =>{
    const { limite = 20, desde = 0 } = req.query;

    // Destructurando los dos arrays
    const [ usuarios, total ] = await Promise.all( 
        [ Usuario.find( { estado: true } )
            .skip( desde )
            .limit( limite ),  
        Usuario.countDocuments({estado: true})
            .limit( limite )] 
        )

    res.json({total, usuarios});
};
const crearUsuarios = async(req, res = response) =>{
    const {  google, estado, ...data} = req.body;
    // const existeCorreo = await Usuario.findOne( {correo: data.correo} );
    // if( existeCorreo ){
    //     return res.status(400).json({
    //         msg:'Correo ya existe en DB'
    //     })
    // }

    // Encriptar contraseña
    data.password = bcrypt.hashSync( data.password, bcrypt.genSaltSync() );

    const usuario = new Usuario( data );

    // Guardar en db
    await usuario.save();

    res.json({
        usuario
    })
};
const actualizarUsuarios = async(req, res = response) =>{
    const  { id } = req.params;
    const { _id, estado, google, password, ...data } = req.body;

    if( password ){
        data.password = bcrypt.hashSync( password, bcrypt.genSaltSync() );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, data );
    if( !usuario ){
        return res.status(400).json({
            msg:'El id no existe'
        });
    }

    res.json({
        data
    });
};
const eliminarUsuarios = async(req, res = response) =>{
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario,
        // token
    })
};

module.exports = {
    obtenerUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuarios
}