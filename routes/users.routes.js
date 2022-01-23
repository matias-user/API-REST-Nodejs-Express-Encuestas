const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('../controllers/usuarios.controller');
const { existeRol, existeEmail, existeUsuario, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos,validarJwt, esAdminRol, tieneRol } = require('../middlewares');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJwt } = require('../middlewares/validar-jwt');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', obtenerUsuarios);

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('password','El password es requerido y mas de 6 caracteres').isLength({ min: 6 }), 
    check('correo','El correo no es valido').isEmail(),
    check('correo',).custom( existeEmail ),
    // check('rol','No es un rol permitido').isIn( ['ADMIN_ROLE','USER_ROLE'] ),
    check('rol').custom( (rol = '') => existeRol(rol) ),
    validarCampos
] ,crearUsuarios);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    check('rol').custom( rol => existeRol(rol) ),
    validarCampos
] ,actualizarUsuarios);

router.delete('/:id',[
    validarJwt,
    tieneRol( 'ADMIN_ROLE','VENTAS_ROLE' ),
    // esAdminRol  //forma mas arcaica,
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
],eliminarUsuarios);


module.exports = router;