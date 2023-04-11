const router = require('express').Router()

const { 
    getMenu
} = require ('../controllers/menu.js')

router.route('/menu').get(getMenu)

module.exports = router