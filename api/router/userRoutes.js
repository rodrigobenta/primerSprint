const express = require('express');
const router = express.Router();
const {listUsers, listUserById, createUser, editUserById, deleteUserById, login} = require('../controller/userController');
const verify = require('../middleware/verifyJWT');


//RUTAS DE USUARIOS:
router.get('/', verify, listUsers);
router.get('/:id', verify, listUserById);
router.post('/', verify, createUser);
router.put('/:id', verify, editUserById);
router.delete('/:id', verify, deleteUserById);
router.post('/login', login);


//RUTAS DE CARTS:
router.get('/:id/cart', verify, listUserById);
router.put('/:id/cart', verify, editUserById);

module.exports = router;