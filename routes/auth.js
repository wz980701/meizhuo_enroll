const router = require('koa-router')()
const Interview = require('../base/auth')

router.prefix('/auth')

router.post('/login', Interview.login)  // 登录
router.get('/logout', Interview.logout) // 登出

module.exports = router

