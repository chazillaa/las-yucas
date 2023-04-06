const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedToken

        if(token && isCustomAuth) {
            decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
            req.userId = decodedToken?.id
        }
        next()

    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
}

module.exports = authToken

// in routes you must add authToken into the route
// inside the route function you use req.userId to check if user is authenticated
// if(!req.userId) return res.json({ message: 'not authenticated'})
