const router = require('koa-router')()

const {
    getUser
} = require('../controller/user')

router.get('/user', async (ctx, next) => {
    // let user = ctx.query.username || ''
    ctx.body = await getUser()
})

module.exports = router

