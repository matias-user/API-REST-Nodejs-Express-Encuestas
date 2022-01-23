const Usuario = require("../models/Usuario");

const esAdminRol = async(req, res, next) =>{

    const { rol, nombre } = req.usuario;
    
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`El usuario ${nombre} no es un rol de administrador.`
        });
    }
    next();
};
const tieneRol = ( ...roles ) => {

    // Como los middlewares se ejecutan con req, res y next y a esta funcion se le pasan 
    // otros argumentos se puede usar los req, res, next en un return callback. 
    return (req, res, next) => {
        const { rol } = req.usuario;
        if( !roles.includes( rol ) ){
            return res.status(401).json({
                msg:'El usuario no puede realizar esta acción.'
            })
        }

        next();
    };
};

module.exports = {
    esAdminRol,
    tieneRol
}