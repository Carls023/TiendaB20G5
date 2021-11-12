const { Router } = require('express');
const { check } = require('express-validator');

const { emailExists } = require('../helpers/req-validatos');
const { validateData } = require('../middlewars') 

const router = Router();

const { 
        userPost,
    } = require('../controllers/users');

// router.get('/', booksGet);

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña no debe tener menos de 6 digitos').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('rol').isIn(['Admin', 'Seller', 'Client']),
    validateData
], userPost);

// router.get('/:id', (req, res) => {
//   res.send('Hello get cc!')
// });

// router.put('/:id', bookPut);

// router.delete('/:id', bookDel);

module.exports = router;