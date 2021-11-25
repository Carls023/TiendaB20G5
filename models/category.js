const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
    
    name:{
        type: String,
        required: [true, 'La categoria es requerida']
    }
});

module.exports = model('Category', CategorySchema, 'category')