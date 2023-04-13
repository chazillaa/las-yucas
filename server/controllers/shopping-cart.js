const { Ingredients, Menu, ShoppingCart } = require('../models');
const mongoose = require('mongoose')

module.exports = {
    //need middleware to determine if logged in or not
    async getCart(req, res) {
        const cart = await ShoppingCart.findOne({
            user: req.userId
        });

        if (cart) {
            res.json(cart);
        }
        else res.json({ message: 'no cart' });
    },
    async getItemFromCart(req, res) {
        const cart = await ShoppingCart.findOne({
            user: req.userId
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
        try {
            const menuItem = await Menu.findById(req.body._id)//.populate('ingredients');

            const itemPrice = calculatePrice(menuItem, req.body.quantity);

            const shopCart = await ShoppingCart.findOne({ user: new mongoose.Types.ObjectId(req.userId) });

            if (shopCart) {
                const updateCart = {
                    price: shopCart.price + itemPrice,
                };

                const item = await ShoppingCart.updateOne({ user: new mongoose.Types.ObjectId(req.userId) },
                    {
                        price: updateCart.price,
                        $push: {
                            menuItems: {
                                quantity: req.body.quantity,
                                menuItem: new mongoose.Types.ObjectId(req.body._id),
                            },
                        },
                    })

                if (item) {
                    res.status(200).json({ count: shopCart.menuItems.length + 1 });
                }
                else res.status(500).json({ message: "failed to add item to cart" });
            }
            else {
                const cartItem = {
                    user: req.userId,
                    price: itemPrice,
                    menuItems: [{
                        menuItem: new mongoose.Types.ObjectId(req.body._id),
                        quantity: req.body.quantity
                    }]
                };

                // const cartMenu = {
                //     _id: new mongoose.Types.ObjectId(req.body._id),
                //     quantity: req.body.quantity
                // };

                const item = await ShoppingCart.create(cartItem);
                // const itemWMenu = await ShoppingCart.updateOne({ _id: item._id },
                //     { $push: { menuItems: cartMenu } }
                // )

                if (item) {
                    res.status(200).json(item);
                }
                else res.status(500).json({ message: "failed to add item to cart" });
            }
        }
        catch (err) {
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
            user: req.userId,
            "menuItems._id": req.body._idCart,
        });

        if (shopCart) {
            const item = {
                quantity: req.body.quantity,
                selectedIngredients: req.body.selectedIngredients,
            };

            const updateSuccess = await ShoppingCart.updateOne({
                user: req.userId,
                "menuItems._id": req.body._idCart,
            }, {
                "$set": {
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
        const item = await ShoppingCart.updateMany(
            {
                user: req.userId,
                // menuItems:{_id: new mongoose.Types.ObjectId(req.params._idCart)}
            },
            {
                $pull: {
                    menuItems:{_id: new mongoose.Types.ObjectId(req.body._idCart)},
                }
            });
        if (item) {
            const count = await ShoppingCart.find({
                user: new mongoose.Types.ObjectId(req.userId)
            })
            res.status(200).json({count: count.menuItems.length});
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