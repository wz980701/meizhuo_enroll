const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    ToLogin,
    getList
} = require('../controller/interview')

class Interview {
    constructor () {
        this.login.bind(this)
        this.list.bind(this)
    }
    async login (ctx, next) {
        const { username, password } = ctx.request.body
        const data = await ToLogin(username, password)
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

module.exports = new Interview()