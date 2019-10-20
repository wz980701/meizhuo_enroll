const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const User = require('../base/user')

router.prefix('/user')

router.post('/login', User.login)  // 登录

router.get('/list', loginCheck, User.list) // 获取列表

module.exports = router

