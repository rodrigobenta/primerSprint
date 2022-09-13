const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, listProductByKeyword, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
const verify = require('../middleware/verifyJWT');
const {verifyCreateEdit, verifyRoleCreateDelete,verifyRoleEdit} = require('../middleware/productMiddleware');
const router = express.Router();


router.get('/', listProduct);
router.get('/search/', listProductByKeyword);
router.get('/mostwanted', verify, listMostWantedProduct);
router.get('/:id', verify, listProductByID);

router.post('/create', verify, verifyRoleCreateDelete, verifyCreateEdit, createProduct);
router.put('/edit/:idProduct', verify, verifyRoleEdit, editProduct);
router.delete('/delete/:id', verify, verifyRoleCreateDelete, deleteProduct);

module.exports = router;