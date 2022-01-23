const { Router } = require('express');
const { obtenerCategorias, crearCategoria, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { validarCampos, validarJwt, esAdminRol } = require('../middlewares');
const { check } = require('express-validator');
const { existeCategoriaId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias
router.get('/',[
    validarCampos
] ,obtenerCategorias)

// Obtener una categoria por id y crear middleware personalizado
router.get('/:id',[
    check('id').custom( existeCategoriaId ),
    validarCampos
] , obtenerCategoria )

// Crear categoria - privado - cualquier persona con token valido.
router.post('/',[
    validarJwt,
    check('nombre','El nombre es requerido').not().isEmpty(),
    validarCampos
] ,  crearCategoria)

// Actualizar por id privado - token valido
router.put('/:id',[
    validarJwt,
    check('nombre').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
] ,  actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJwt,
    esAdminRol,
    validarCampos
] , borrarCategoria);


module.exports = router;