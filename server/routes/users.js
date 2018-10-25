var express = require('express');
var router = express.Router();
const { login, register } = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.post('/login', login)
router.post('/register', register)
router.get('/checklogin', isLogin, (req, res) => { res.status(200).json({}) })

module.exports = router;
