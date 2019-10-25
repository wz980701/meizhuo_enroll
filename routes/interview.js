const router = require('koa-router')()
const loginCheckInterview = require('../middleware/loginCheckInterview')
const loginCheck = require('../middleware/loginCheck')
const Interview = require('../base/interview')

router.prefix('/interview')

router.get('/call', loginCheckInterview, Interview.nextUser) // 下一个面试者

router.post('/login', Interview.login)   // 面试官登录

router.get('/list', loginCheck, Interview.list) // 获取面试官列表

router.get('/logout', Interview.logout) // 面试官退出登录

module.exports = router