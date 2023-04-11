const router = require('express').Router()
const userRoutes = require('./users')
const menuRoutes = require('./menus')

router.use('/api', userRoutes)
router.use('/api', menuRoutes)

module.exports = router
