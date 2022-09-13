const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, listProductByKeyword, listCategory, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
const verify = require('../middleware/verifyJWT');
const {verifyCreateEdit, verifyRoleCreateDelete,verifyRoleEdit} = require('../middleware/productMiddleware');
const router = express.Router();


router.get('/', listProduct);
router.get('/search/', listProductByKeyword);
//AGREGAR RUTA CATEGORIA.. ya esta importado arriba y exportado en products controller.
router.get('/mostwanted', verify, listMostWantedProduct);
router.get('/:id', verify, listProductByID);

router.post('/', verify, verifyRoleCreateDelete, verifyCreateEdit, createProduct);
router.put('/:idProduct', verify, verifyRoleEdit, editProduct);
router.delete('/:id', verify, verifyRoleCreateDelete, deleteProduct);

module.exports = router;