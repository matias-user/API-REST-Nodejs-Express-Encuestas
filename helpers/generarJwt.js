const jwt = require('jsonwebtoken');

const generarJwt = ( uid = '' ) =>{
    
    return new Promise( (resolve, rej) => {
        const payolad = { uid };

        jwt.sign( payolad, process.env.PRIVATE_KEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if( err ){
                rej( err )
            }
            resolve( token )
        });
        
    });
};

module.exports = {
    generarJwt
}