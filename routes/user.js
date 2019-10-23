const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const User = require('../base/user')


router.prefix('/user')

router.post('/apply', User.apply)   // 面试者报名

router.get('/list', loginCheck, User.list)  // 获取面试者列表

router.get('/detail', User.detail)  // 获取面试者详情

module.exports = router