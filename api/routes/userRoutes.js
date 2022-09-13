const express = require('express');
const router = express.Router();
const {login,listUsers, listUserById, createUser, editUserById, deleteUserById,} = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const { createUserVerify, verifyRoleList, verifyRoleEdit, verifyRoleDelete} = require('../middleware/userMiddleware');


//RUTAS DE USUARIOS:JWT
router.get('/', verifyJWT, verifyRoleList, listUsers); 
router.get('/:id', verifyJWT, verifyRoleList, listUserById);
router.post('/', createUserVerify, createUser);
router.put('/:id', verifyJWT, verifyRoleEdit, editUserById);
router.delete('/:id', verifyJWT, verifyRoleDelete, deleteUserById);


router.post('/login', login);


//RUTAS DE CARTS:
router.get('/:id/cart', verifyJWT, listUserById);
router.put('/:id/cart', verifyJWT, editUserById);

module.exports = router;