const Role = require('../models/Role');
const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');

const existeRol = async(rol) =>{

    const existe = await Role.findOne( { rol } );
    if(!existe){
        throw new Error(`El rol no existe en la DB ${rol}`)
    }
};
const existeEmail = async( correo = '' ) =>{
    const existe = await Usuario.findOne({ correo });
    if(existe){
        throw new Error('El email ya existe en la DB');
    }
};
const existeUsuarioById = async(id ) =>{
    const usuario = await Usuario.findById(id);
    if(!usuario){
        throw new Error(`No existe un usuario con el id ${id}`);
    }
};
const existeCategoriaId = async( id = '') =>{
    const existe = await Categoria.findById( id );
    if(!existe ){
        throw new Error('El id ingresado no corresponde a alguna categoria');
    }
}
module.exports = {
    existeRol,
    existeEmail,
    existeUsuarioById,
    existeCategoriaId
}