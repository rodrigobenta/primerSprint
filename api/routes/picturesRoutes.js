const express = require('express');
const verify  = require('../middleware/verifyJWT');
const {listPictures, listPictureById, createPicture, editPicture, deletePicture} = require('../controllers/picturesController');
const { verifyCreateEditPictures, verifyByID } = require('../middleware/picturesMiddelware');
const router = express.Router();

//RUTAS PARA PICTURES:
router.get('/', verify,listPictures);
router.get('/:id' ,verify,listPictureById);
router.post('/create',verify,verifyCreateEditPictures ,createPicture);
router.put('/edit/:IdPictures',verify,verifyCreateEditPictures ,editPicture);
router.delete('/delete/:id',verify ,deletePicture);

module.exports = router;