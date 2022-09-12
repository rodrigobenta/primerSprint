const express = require('express');
const {login, show, create, edit, deleteU} = require('../controllers/userController');
const verify = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/login', login);
router.post('/create', verify, create);
router.put('/edit/:id', verify, edit);
router.delete('/delete/:id', verify, deleteU);

module.exports = router;