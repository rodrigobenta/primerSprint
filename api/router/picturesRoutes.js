const express = require('express');
const verify  = require('../middleware/verifyJWT');
const {listPictures, listPictureById, createPicture, editPicture, deletePicture} = require('../controllers/picturesController');
const router = express.Router();

//RUTAS PARA PICTURES:
router.get('/', verify, listPictures);
router.get('/:id', verify, listPictureById);
router.post('/', verify, createPicture);
router.put('/:id', verify, editPicture);
router.delete('/:id', verify, deletePicture);

module.exports = router;