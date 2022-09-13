const express = require('express');
const router = express.Router();
const {login,listUsers, listUserById, createUser, editUserById, deleteUserById,} = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const { createUserVerify, verifyRoleList, verifyRoleEdit, verifyRoleDelete} = require('../middleware/userMiddleware');
const { cartOfId, updateCart } = require('../controllers/cartsControllers');


//RUTAS DE USUARIOS:JWT
router.get('/', verifyJWT, verifyRoleList, listUsers); 
router.get('/:id', verifyJWT, verifyRoleList, listUserById);
router.post('/', createUserVerify, createUser);
router.put('/:id', verifyJWT, verifyRoleEdit, editUserById);
router.delete('/:id', verifyJWT, verifyRoleDelete, deleteUserById);


router.post('/login', login);


//RUTAS DE CARTS:
router.get('/:id/cart', verifyJWT, cartOfId);
router.put('/:id/cart', verifyJWT, verifyRoleEdit, updateCart);

module.exports = router;