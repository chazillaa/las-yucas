const router = require('express').Router();
const auth = require('../utils/auth');

const { 
    postItemInCart,
    deleteItemInCart
} = require ('../controllers/shopping-cart.js');

router.route('/cart').post(auth,postItemInCart).delete(auth,deleteItemInCart);

module.exports = router;