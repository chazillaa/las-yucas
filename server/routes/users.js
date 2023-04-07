const router = require('express').Router()

const { 
    login,
    signup,
    getUsers,
    deleteUser
} = require ('../controllers/user.js')

router.route('/login').post(login)

router.route('/signup').post(signup)

router.route('/').get(getUsers)

router.route('/:id').delete(deleteUser)

module.exports = router