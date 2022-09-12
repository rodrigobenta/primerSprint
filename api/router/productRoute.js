const express = require('express');
const router = express.Router();
const {listProduct, listProductByKeyword, listProductMostwated, createProduct, editProduct, deleteProduct} = require('../controller/productController');
const { listPictures} = require('../controllers/picturesController');
const verify = require('../middleware/verifyJWT');


//RUTAS DE PRODUCTOS:
router.get('/', verify, listProduct); 
router.get('/:id', verify, listProductByKeyword); 
router.post('/', verify, createProduct); 
router.put('/:id', verify, editProduct); 
router.get('/', verify, listProductMostwated) 
router.delete('/delete/:id', verify, deleteProduct); 

//ALIAS:
router.get('/:id/pictures', verify, listPictures);
module.exports = router



