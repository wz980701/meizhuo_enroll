const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const User = require('../base/user')


router.prefix('/user')

router.post('/apply', User.apply)   // 面试者报名

router.get('/list', loginCheck, User.list)  // 获取面试者列表

router.get('/detail', loginCheck, User.detail)  // 获取面试者详情

router.post('/sign', User.signIn) // 面试者签到

router.get('/sign/list', User.signList)     // 获取签到者列表

module.exports = router