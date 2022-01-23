const { Categoria } = require('../models/index');

// obtener todas las categorias - pagina - total - populate
const obtenerCategorias = async(req, res) =>{
    const { limite = 10, desde = 0 } = req.query;


    const [ categorias, total ] = await Promise.all( [
        Categoria.find({ estado:true })
        .populate('usuario','nombre').limit( limite ).skip( desde ),
        Categoria.find({estado:true}).countDocuments()
    ] )

    res.json({
        total,
        categorias
    })

};
// Obtener categoria - populate
const obtenerCategoria = async(req, res) =>{
    const { id } = req.params;
    const categoria = await Categoria.findById( id )
        .populate('usuario','nombre');

    if( !categoria ){
        res.status(200).json({
            msg:'El id no corresponde a ninguna categoria'
        });
    }
    res.json({
        categoria
    })
};
const crearCategoria = async(req, res) =>{
    const nombre = req.body.nombre.toUpperCase();

    const existeCategoria = await Categoria.findOne({ nombre });
    if( existeCategoria ){
        return res.status(400).json({
            msg:`La categoria ${existeCategoria.nombre} ya existe`
        });
    };
    // El campo usuario relacionado a categoria se inserta como aqui abajo.
    const data = {
        nombre,
        usuario: req.usuario._id
    };
    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json( categoria );
};  

// Actualizar categoria
const actualizarCategoria = async(req, res) =>{
    const { id } = req.params;
    const  nombre  = req.body.nombre.toUpperCase();
    const categoriaActualizada = await Categoria.findByIdAndUpdate( id, { nombre } );

    
    res.json({
        categoriaActualizada
    })
};

// Borrar categoria - estado false
const borrarCategoria = async(req, res) => {
    const { id } = req.params;
    await Categoria.findByIdAndUpdate( id, { estado: false });

    res.json({
        msg: `Categoria con id ${id} fue eliminada`
    });
};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}