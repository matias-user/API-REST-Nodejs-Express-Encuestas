const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.CNN_MONGO );
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error en conexion en DB ', error);
    }
};

module.exports = {
    dbConnection
}