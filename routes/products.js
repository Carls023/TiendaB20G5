const { Router } = require('express');

const router = Router();

const { productsGet, 
        productPost, 
        productPut, 
        productDel 
    } = require('../controllers/products');

router.get('/', productsGet);

router.post('/', productPost);

router.get('/:id', (req, res) => {
  res.send('Hello get cc!')
});

router.put('/:id', productPut);

router.delete('/:id', productDel);

module.exports = router;