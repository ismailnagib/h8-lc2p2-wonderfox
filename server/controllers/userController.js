const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

    register (req, res) {
        if (/\S+@\S+\.\S+/.test(req.body.email) === false) {
            res.status(500).json({message: 'You should input a valid email address'})
        } else if (req.body.password.length < 1) {
            res.status(500).json({message: 'You should input a password'})
        } else {
            User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    res.status(500).json({message: 'Email has been registered before'})
                } else {
                    let hashed = bcrypt.hashSync(req.body.password)
                    User.create({
                        email: req.body.email,
                        password: hashed
                    })
                    .then(data => {
                        res.status(200).json({message: 'New user successfully registered'})
                    })
                    .catch(err => {
                        res.status(500).json({message: err})
                    })
                }
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        }
    },

    login (req, res) {
        if (!req.body.email || req.body.email.length === 0 || !req.body.password || req.body.password.length === 0) {
            res.status(500).json({message: 'Please input your email and password'})
        } else {
            User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let validPassword = bcrypt.compareSync(String(req.body.password), user.password)
                    if (validPassword) {
                        let token = jwt.sign({
                            id: user._id,
                            email: user.email,
                            likedVideos: user.likedVideos
                        }, process.env.JWT_KEY)
                        res.status(200).json({token: token})
                    } else {
                        res.status(500).json({message: 'Incorrect email and/or password'})
                    }
                } else {
                    res.status(500).json({message: 'Incorrect email and/or password'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err})
            })
        }
    }
}