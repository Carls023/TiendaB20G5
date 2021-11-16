const { Schema, model } = require('mongoose');

const ProductSchema =  Schema({
    name:{
        type: String,
        required: [true, 'Error db: El nombre del producto es requerido']
    },
    amount: {
        type: String,
        required: [true, 'Error db: La cantidad de productos es requerido']
    },
    price: {
        type: String,
        required: [true, 'Error db: El precio del productos es requerido']
    },
    img: {
        type: String
    },
    category:{
        type: String,
        required: true
    },
    status:{
        type: String,
        require: true,
        default: true
    }
});

// ProductSchema.methods.toJSON = function(){
//     const { _id, __v,  ...product } = this.toObject();
//     product.productId = _id;
//     return product;
// }

module.exports = model('Product', ProductSchema)
