const express = require('express');
const {create, edit, deleteP} = require('/Users/rodrigoandresbentancor/Documents/Visual Studio Code Projects/22-primerSprint/api/controllers/productController.js');
const verify = require('../middleware/verifyJWT');
//const middlewareUser = require(../)
const router = express.Router();


router.post('/create', verify, create);
router.put('/edit/:id', verify, edit);
router.delete('/delete/:id', verify, deleteP);

module.exports = router;