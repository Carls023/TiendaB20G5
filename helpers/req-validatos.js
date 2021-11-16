const User = require('../models/user');
const Rol = require('../models/rol');
const Category = require('../models/category');

const emailExists = async (email = '') => {
    let user = await User.findOne({ email });
    if(user){
        throw new Error(`El correo ${email} ya existe`);
    }
}

const rolExists = async (_rol = '') => {
    let rol = await Rol.findOne({ rol: _rol });
    if(!rol){
        throw new Error(`El correo ${ _rol } ya existe`);
    }
}

const userByIDExists = async (_id = '') => {
    let user = await User.findOne({ _id });
    if(!user){
        throw new Error(`El id ${ id } no existe en la plataforma`);
    }
}

const categoryExists = async (_category = '') => {
    let category = await Rol.findOne({ category: _category });
    if(!category){
        throw new Error(`La categoria ${ _category } ya existe`);
    }
}

module.exports = {
    emailExists,
    rolExists,
    userByIDExists,
    categoryExists
}