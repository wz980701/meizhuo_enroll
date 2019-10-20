const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    Login,
    getList
} = require('../controller/user')

class User {
    constructor () {
        this.login.bind(this)
    }
    async login (ctx, next) {
        const { username, password } = ctx.request.body
        const data = await Login(username, password)
        if (data.h_username) {
            ctx.session.h_username = data.h_username
            ctx.body = new SuccessModel('登录成功')
            return
        }
        ctx.body = new ErrorModel('登录失败')
    }
    async list (ctx, next) {
        const data = await getList()
        if (data) {
            ctx.body = new SuccessModel('获取成功')
        } else {
            ctx.body = new ErrorModel('获取失败')
        }
    }
}

module.exports = new User()