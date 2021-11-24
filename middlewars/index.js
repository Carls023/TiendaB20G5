const validateData = require('./validate-data');
const validateJwt = require('./validate-jwt');
const validateRols = require('./validate-rols')


module.exports = {
    ...validateData,
    ...validateJwt,
    ...validateRols
}