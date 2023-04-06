const router = require('express').Router()

const { 
    login, 
    signup,
    getUsers 
} = require ('../controllers/user.js')

router.route('/login').post(login)

router.route('/signup').post(signup)

router.route('/').get(getUsers)

module.exports = router