const router = require('express').Router()
const userRoutes = require('./users')
const menuRoutes = require('./menus')
const cartRoutes = require('./cart')

router.use('/api', userRoutes)
router.use('/api', menuRoutes)
router.use('/api', cartRoutes)

module.exports = router
