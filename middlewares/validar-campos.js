const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{
    const hayError = validationResult(req);
    if( !hayError.isEmpty() ){

        return res.status(400).json(hayError);
    }
    next();
};

module.exports = {
    validarCampos
}