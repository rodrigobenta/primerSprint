const express = require('express');
<<<<<<< HEAD:api/router/userRoutes.js
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
=======
const {login, show, create, edit, deleteU} = require('../controllers/userController');
const verify = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/login', login);
router.post('/create', verify, create);
router.put('/edit/:id', verify, edit);
router.delete('/delete/:id', verify, deleteU);
>>>>>>> 06c080cde587a73d19c8a3289870aa9e50c71912:api/routes/userRoutes.js

module.exports = router;