const {Ingredients, Menu, ShoppingCart} = require('../models');

module.exports = {
    //need middleware to determine if logged in or not
    getCart(req, res){
        const cart = ShoppingCart.findOne({
            where:{
                user:req.session.user_id
            }
        });

        if(cart){
            res.json(cart);
        }
        else res.json({message:'no cart'});
    },
    /*
    
    */
    getItemFromCart(req, res){
        const cart = ShoppingCart.findOne({
            where:{
                user:req.session.user_id
            }
        });

        if(cart){
            res.json(cart);
        }
        else res.json({message:'no cart'});
    },
};