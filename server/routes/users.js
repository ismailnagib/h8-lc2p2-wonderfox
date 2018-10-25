var express = require('express');
var router = express.Router();
const { login, register, likeToggle, getLiked } = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.post('/login', login)
router.post('/register', register)
router.get('/checklogin', isLogin, (req, res) => { res.status(200).json({}) })
router.get('/liked', isLogin, getLiked)
router.patch('/like/:id', isLogin, likeToggle)

module.exports = router;
