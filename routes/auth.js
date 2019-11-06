const router = require('koa-router')()
const Interview = require('../base/auth')

router.prefix('/auth')

router.post('/login', Interview.login)  // 登录

module.exports = router

