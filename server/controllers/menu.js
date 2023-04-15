const { Menu } = require('../models');

module.exports = {
    async getMenu(req, res){
        // const menu = await Menu.find({})
        Menu.find({}).lean()
        .then((menu) => res.json(menu))
        .catch((err) => res.status(500).json(err))
    }
}