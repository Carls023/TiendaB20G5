const productsGet = (req, res) => {
    res.json({msg: 'Get Api controller'});
}

const productPost = (req, res) => {
    res.json({msg: 'Post Api controller'});
}

const productPut = (req, res) => {
    res.json({msg: 'Put Api controller'});
}

const productDel = (req, res) => {
    res.json({msg: 'Delete Api controller'});
}

module.exports = {
    productsGet,
    productPost,
    productPut,
    productDel
}