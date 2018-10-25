const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    jwt.verify(req.headers.token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            next(err)
        } else {
            next()
        }
    })
}