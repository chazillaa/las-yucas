const { Ingredients, Menu, ShoppingCart } = require('../models');
const {Schema} = require('mongoose')

module.exports = {
    //need middleware to determine if logged in or not
    async getCart(req, res) {
        const cart = await ShoppingCart.findOne({
            where: {
                user: req.userId
            }
        });

        if (cart) {
            res.json(cart);
        }
        else res.json({ message: 'no cart' });
    },
    async getItemFromCart(req, res) {
        const cart = await ShoppingCart.findOne({
            where: {
                user: req.userId
            }
        }).populate(
            { Menu },
            { Ingredients },
        );

        if (cart) {
            res.json(cart);
        }
        else res.json({ message: 'no cart' });
    },

    /*
    req.body{
        _id
        quantity
        selectedIngredients[
            _id
        ]
    }
    */
    async postItemInCart(req, res) {
        try{

        
        const menuItem = await Menu.findById(req.body._id)//.populate('ingredients');

        const itemPrice = calculatePrice(menuItem, req.body.quantity);

        const shopCart = await ShoppingCart.findOne({
            where: {
                user: req.userId,
            }
        });
        if (shopCart) {
            const updateCart = {
                price: shopCart.price + itemPrice,
                menuItems: shopCart.menuItems.push(req.body),
            };

            const item = await ShoppingCart.updateOne({
                where: {
                    user: req.userId
                }
            }, updateCart);

            if (item) {
                res.status(200).json(item);
            }
            else res.status(500).json({ message: "failed to add item to cart" });
        }
        else {
            const cartItem = {
                user:req.userId,
                price: itemPrice,
                menuItem: [req.body]
            };

            const item = await ShoppingCart.create(cartItem);
            if (item) {
                res.status(200).json(item);
            }
            else res.status(500).json({ message: "failed to add item to cart" });
        }
    }
    catch(err){
        res.status(500).json(err);
    }
    },

    /* Only items that changed
    req.body{
        _idCart
        quantity
        selectedIngredients[
            _id
        ]      
    }
    */
    async putItemInCart(req, res) {
        const shopCart = await ShoppingCart.fidnOne({
            where: {
                user: req.userId,
                "menuItems._id": req.body._idCart,
            }
        });

        if (shopCart) {
            const item = {
                quantity: req.body.quantity,
                selectedIngredients : req.body.selectedIngredients,
            };

            const updateSuccess = await ShoppingCart.updateOne({
                where: {
                    user: req.userId,
                    "menuItems._id": req.body._idCart,
                }
            }, {
                "$set":{
                    "menuItems.$": item,
                }
            });

            if (updateSuccess) {
                res.status(200).json(updateSuccess);
            }
            else {
                res.status(500).json({ message: "failed to update cart" });
            }
        }
        else res.status(500).json({ message: "item does not exist in cart" });
    },

    async deleteItemInCart(req, res) {
        const item = await ShoppingCart.deleteOne({
            where: {
                user: req.userId,
                "menuItems._id": req.params._idCart,
            }
        });
        if (item) {
            res.status(200).json(item);
        }
        else res.status(500).json({ message: "unable to delete item" });
    },
};

function calculatePrice(item, quantity) {
    const ingredientPrices = 0;
    if (item.selectedIngredients) {
        ingredientPrices = item.selectedIngredients.reduce((currentSum, ingred) => {
            return currentSum + ingred.price;
        }, 0);
    }
    const price = quantity * (item.price + ingredientPrices);

    return price
}  