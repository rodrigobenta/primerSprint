const express = require('express');
const router = express.Router();
const {cartOfId, updateCart} = require('../controllers/cartController');
const verify = require('../middleware/verifyJWT');


router.get('/:id', verify, cartOfId);
router.put('/:id', verify, updateCart);


module.exports = router;