const { Schema, model } = require('mongoose');

const UserSchema =  Schema({
    name:{
        type: String,
        required: [true, 'Error db: El nombre de usuario es requerido']
    },
    email: {
        type: String,
        required: [true, 'Error db: El email de usuario es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Error db: El contraseña de usuario es requerido']
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true
    }
});

UserSchema.methods.toJSON = function(){
    const { _id, __v, password, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema)
