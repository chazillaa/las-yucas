const router = require('express').Router();
const auth = require('../utils/auth');

const { 
    postItemInCart,
    deleteItemInCart,
    getCart,
    purchaseOrder
} = require ('../controllers/shopping-cart.js');

router.route('/cart').post(auth,postItemInCart).get(auth, getCart);
router.route('/cart/:id').delete(auth,deleteItemInCart)
router.route('/cart/purchase').post(auth, purchaseOrder);

module.exports = router;