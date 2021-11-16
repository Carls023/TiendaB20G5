const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
    
    rol:{
        type: String,
        required: [true, 'La categoria es requerida']
    }
});

module.exports = model('Categoria', CategorySchema)