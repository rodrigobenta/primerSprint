const express = require('express');
const {login, show, create, edit, deleteU} = require('../controller/userController');
const verify = require('../middleware/verifyJWT');
//const middlewareUser = require(../)

router.get('/login', verify, login);
router.post('/create', verify, create);
router.put('/edit/:id', verify, edit);
router.delete('/delete/:id', verify, deleteU);