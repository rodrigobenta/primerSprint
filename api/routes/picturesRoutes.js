const express = require('express');
const verify  = require('../middleware/verifyJWT');
const {listPictures, listPictureById, createPicture, editPicture, deletePicture} = require('../controllers/picturesController');
const router = express.Router();

//RUTAS PARA PICTURES:
router.get('/', listPictures);
router.get('/:id', listPictureById);
router.post('/create', createPicture);
router.put('/edit/:IdPictures', editPicture);
router.delete('/delete/:id', deletePicture);

module.exports = router;