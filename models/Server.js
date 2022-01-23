require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias'
        }
        // Conectar DB
        this.conectarDB();

        this.middlewares();

        // Rutas de app
        this.routes();

    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        // Parseo del body
        this.app.use( express.json() );

        // Habilitar CORS para no tener problemas al acceder al api
        this.app.use( cors() );

        // Servir carpeta publica
        this.app.use( express.static('public') );
    }
    routes(){
        this.app.use( this.paths.usuarios, require('../routes/users.routes'));
        this.app.use( this.paths.auth, require('../routes/auth.routes') );
        this.app.use( this.paths.categorias, require('../routes/categorias.routes') );
    }
    listen(){
        this.app.listen( this.port );
    }
}

module.exports = Server;