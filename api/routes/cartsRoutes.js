const express = require('express');
const router = express.Router();
const {cartOfId, updateCart} = require('../controllers/cartsControllers');
const verify = require('../middleware/verifyJWT');


router.get('/:id', verify, cartOfId);
router.put('/:id', verify, updateCart);

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