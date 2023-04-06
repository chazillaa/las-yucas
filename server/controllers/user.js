const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Users } = require('../models')

module.exports = {

    async getUsers(req, res){
        Users.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },


    async login(req, res){
        const { email, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: 'User doesnt exist' })

        const isPassword = await bcrypt.compare(password, existingUser.password)

        if(!isPassword) return res.status(400).json({ message: 'Wrong Password' })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: '1h'})

        res.status(200).json({ result: existingUser, token})
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' })
    }
    },

    async signup(req, res){
       try {
        const { email, password, username} = req.body

        const existingUser = await Users.findOne({ email })

        if(existingUser)return res.status(400).json({ message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await Users.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.TOKEN_KEY, { expiresIn: '2h'})

        result.token = token

        res.status(200).json({result, token})

    } catch (err) {

        res.status(500).json({ message: 'Something went wrong' })
    }
    }
}
