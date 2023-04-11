const { Ingredients, Menu, ShoppingCart } = require('../models');

module.exports = {
    async getMenu(req, res){
        // const menu = await Menu.find({})
        Menu.find({})
        .then((menu) => res.json(menu))
        .catch((err) => res.status(500).json(err))
    }
}