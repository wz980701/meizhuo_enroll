const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    console.log(ctx.session)
    if (ctx.session.h_username) {
        await next()
        return
    }
    ctx.body = new ErrorModel('未登录')
}