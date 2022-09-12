const express = require('express');
const {login, show, create, edit, deleteU} = require('../controller/userController');
const {createUserVerify, verifyRoleList, verifyRoleEdit} = require('../middleware/userMiddleware')
const verifyToken = require('../middleware/verifyJWT');
//const middlewareUser = require(../)

router.get('/login', verifyToken, login);
router.post('/create', [verifyToken, createUserVerify], create);
router.put('/edit/:id', [verifyToken, verifyRoleEdit], edit);
router.delete('/delete/:id', verifyToken, deleteU);