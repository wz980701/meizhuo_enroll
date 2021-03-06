const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    toLogin
} = require('../controller/auth')

class Auth {
    constructor () {
    }
    async login (ctx, next) {
        const { username, password } = ctx.request.body
        const data = await toLogin(username, password)
        if (data.h_username) {
            ctx.session.h_username = data.h_username
            ctx.body = new SuccessModel('登录成功')
            return
        }
        ctx.body = new ErrorModel('登录失败')
    }
    async logout (ctx, next) {
        ctx.session.h_username = ''
        ctx.body = new SuccessModel('登出成功')
        return
    }
}

module.exports = new Auth()