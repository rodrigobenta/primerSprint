const express = require('express');
const router = express.Router();
const {listProduct, listProductByKeyword, listProductMostwated, createProduct, editProduct, deleteProduct} = require('../controller/productController');
const verify = require('../middleware/verifyJWT');


//RUTAS DE PRODUCTOS:
router.get('/', verify, listProduct); //muestra los productos
router.get('/:id', verify, listProductByKeyword); //muestra producto por id
router.post('/', verify, createProduct); //crea un producto
router.put('/:id', verify, editProduct); //edita un producto
router.get('/', verify, listProductMostwated) // muestra los prods mas buscados
router.delete('/delete/:id', verify, deleteProduct);

module.exports = router



