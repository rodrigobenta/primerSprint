const express = require('express');
const verify  = require('../middleware/verifyJWT');
const {listPictures, listPictureById, createPicture, editPicture, deletePicture} = require('../controllers/picturesController');
const { verifyCreateEditPictures, verifyRoleEditPicture } = require('../middleware/picturesMiddelware');
const router = express.Router();


router.get('/', verify, listPictures);
router.get('/:id' , verify,listPictureById);
router.post('/',verify, verifyRoleEditPicture ,verifyCreateEditPictures ,createPicture);
router.put('/:id',verify, verifyRoleEditPicture ,verifyCreateEditPictures ,editPicture);
router.delete('/:id',verify, verifyRoleEditPicture ,deletePicture);



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