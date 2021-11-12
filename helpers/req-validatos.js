const User = require('../models/user');

const emailExists = async (email = '') => {
    let user = await User.findOne({ email });
    if(user){
        throw new Error(`El correo ${email} ya existe`);
    }
}

module.exports = {
    emailExists
}