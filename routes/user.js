const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const User = require('../base/user')


router.prefix('/user')

router.post('/apply', User.apply)   // 面试者报名

router.get('/list', loginCheck, User.list)  // 获取面试者列表

router.get('/detail', loginCheck, User.detail)  // 获取面试者详情

router.post('/sign', User.signIn) // 面试者签到

router.get('/sign/list', User.signList)     // 获取签到者列表

router.get('/sign/del', User.delSignUser)   // 删除签到者

router.get('/search', User.search)  // 搜索面试者

router.get('/getResult', User.getResult)  // 查询面试结果

router.post('/setResult', User.setResult)   // 编写面试结果

module.exports = router