const router = require('express').Router()
const auth = require('../utils/auth');

const { 
    postItemInCart
} = require ('../controllers/shopping-cart.js')

router.route('/cart').post(auth,postItemInCart)

module.exports = router