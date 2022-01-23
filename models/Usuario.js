const { Schema, model } = require("mongoose");

const UsuariosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
// Sobreescribir la respuesta de usuario para que no devuelva todos los campos
// Tiene que ser con function normal ya que se necesita el this
UsuariosSchema.methods.toJSON = function(){
    const { password, __v, _id,...data } = this.toObject();
    data.uid = _id;
    return data;
};

module.exports = model('Usuario', UsuariosSchema)