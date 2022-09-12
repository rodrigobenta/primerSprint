const express = require('express');
const {show, create, edit, deleteP} = require('../controller/productController');
const verify = require('../middleware/verifyJWT');
//const middlewareUser = require(../)


router.post('/create', verify, create);
router.put('/edit/:id', verify, edit);
router.delete('/delete/:id', verify, deleteP);