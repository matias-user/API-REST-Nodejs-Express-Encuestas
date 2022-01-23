const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true,'El rol es obligatorio']
    },
    usuarios:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
});

module.exports = model('Role', RoleSchema);