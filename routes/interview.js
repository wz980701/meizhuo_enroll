const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const Interview = require('../base/interview')

router.prefix('/interview')

router.post('/login', Interview.login)  // 登录

router.get('/list', loginCheck, Interview.list) // 获取列表

module.exports = router

