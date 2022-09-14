const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, listProductByKeyword, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
const verify = require('../middleware/verifyJWT');
const {verifyCreateEdit, verifyRoleCreateDelete,verifyRoleEdit} = require('../middleware/productMiddleware');
const { listPictures } = require('../controllers/picturesController');
const router = express.Router();


router.get('/', verify, listProduct); //lista todo o categorias.
router.get('/search/', listProductByKeyword);
router.get('/mostwanted', verify, listMostWantedProduct);
router.get('/:id/pictures', verify, listPictures);
router.get('/:id', verify, listProductByID);

router.post('/', verify, verifyRoleCreateDelete, verifyCreateEdit, createProduct);
router.put('/:idProduct', verify, verifyRoleEdit, editProduct);
router.delete('/:id', verify, verifyRoleCreateDelete, deleteProduct);

router.get('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

router.put('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

router.post('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})
router.delete('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

module.exports = router;