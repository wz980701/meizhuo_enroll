const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => { // 检查登录状态
    if (ctx.session.department && ctx.session.group) {
        await next()
        return
    }
    ctx.body = new ErrorModel('未登录')
}