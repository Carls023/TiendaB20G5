const { Router } = require('express');
const { check } = require('express-validator');

const { 
    emailExists,
    rolExists,
    userByIDExists
} = require('../helpers/req-validatos');

const { 
    validateData,
    validateJWT,
    isAdmin,
    isRol
} = require('../middlewars') 

const router = Router();

const { 
        usersGet,
        usersLogin,
        userPost,
        userPut,
        userDel
    } = require('../controllers/users');

router.get('/', [
    validateJWT, 
    isRol('Admin', 'Seller')
], usersGet);

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', '').not().isEmpty(),
    validateData
], usersLogin);

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña no debe tener menos de 6 digitos').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('rol').custom(rolExists),
    validateData
], userPost);

router.put('/:id', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id', 'No es un ID valido').custom(userByIDExists),
    check('rol').custom(rolExists),
    validateData
], userPut);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', 'No es un ID valido').custom(userByIDExists),
    validateData
], userDel)

// router.get('/:id', (req, res) => {
//   res.send('Hello get cc!')
// });


module.exports = router;