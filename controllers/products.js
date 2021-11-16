const product = require('../models/product');

const Product = require('../models/product');

const productsGet = async (req, res) => {
    const { limit = 5, page = 1} = req.query;
    const query = { status: true}
    const skip = limit * (page - 1);


    const [ products, totalProducts ] = await Promise.all([
                                        Product.find(query)
                                               .skip(Number(skip))
                                               .limit(limit),
                                        Product.countDocuments(query)
                                    ])

    res.json({
        products,
        totalProducts
    })
}

const productPost = async (req, res) => {
    const { category, name, amount, price } = req.body

    let product = new Product({ category, name, amount, price });

    await product.save();

    res.json({
        product
    });
}

const productPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;


    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);
}

const productDel = async (req, res) => {
    const { id } = req.params;

    // Eliminacion fisica del registro, se pierde la integridad de los dartos en la DB
    //const product = await Product.findByIdAndDelete(id);

    const product = await Product.findByIdAndUpdate(id, { status: false});

    res.json( product );
}

module.exports = {
    productsGet,
    productPost,
    productPut,
    productDel
}