const router = require('koa-router')()
const User = require('../base/user')

router.prefix('/user')

router.post('/apply', User.apply)   // 面试者报名

module.exports = router