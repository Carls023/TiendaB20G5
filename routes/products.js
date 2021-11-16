const { Router } = require('express');
const { check } = require('express-validator');

const { 
      categoryExists
} = require('../helpers/req-validatos');
const { validateData } = require('../middlewars')

const router = Router();

const { productsGet, 
        productPost, 
        productPut, 
        productDel 
    } = require('../controllers/products');

router.get('/', productsGet);

router.post('/', [
  check('category', 'La categoria es requerido').not().isEmpty(),
  check('category').custom(categoryExists),
  check('name', 'El nombre es requerido').not().isEmpty(),
  validateData
], productPost);

router.get('/:id', (req, res) => {
  res.send('Hello get cc!')
});

router.put('/:id', productPut);

router.delete('/:id', productDel);

module.exports = router;