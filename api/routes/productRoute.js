const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, createProduct, editProduct, deleteProduct, listProductByKeyword} = require('../controllers/productController');
const verify = require('../middleware/verifyJWT');
const {verifyCreateEdit, verifyRoleCreateDelete,verifyRoleEdit} = require('../middleware/productMiddleware');
const router = express.Router();


router.get('/', verify, listProduct);
router.get('/:id', verify, listProductByID);
router.get('/keyword', listProductByKeyword);
router.get('/mostwanted', verify, listMostWantedProduct);

router.post('/create', verify, verifyRoleCreateDelete, verifyCreateEdit, createProduct);
router.put('/edit/:id', verify, verifyRoleEdit, editProduct);
router.delete('/delete/:id', verify, verifyRoleCreateDelete, deleteProduct);

module.exports = router;