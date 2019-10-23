const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
    addUser,
    getList,
    getDetail
} = require('../controller/user')
const { _deepCopy } = require('../utils/_common')

class User {
    constructor () {
        this.apply.bind(this)
        this.list.bind(this)
        this.detail.bind(this)
    }
    async apply (ctx, next) {
        const user_data = _deepCopy(ctx.request.body)
        const val = await addUser(user_data)
        if (val) {
            ctx.body = new SuccessModel('报名成功')
        } else {
            ctx.body = new ErrorModel('报名失败')
        }
    }
    async list (ctx, next) {
        const val = await getList(ctx.query)
        if (val) {
            ctx.body = new SuccessModel(val, '获取成功')
        } else {
            ctx.body = new ErrorModel('获取失败')
        }
    }
    async detail (ctx, next) {
        const val = await getDetail(ctx.query.id)   // 获取面试者id
        if (val) {
            ctx.body = new SuccessModel(val, '获取成功')
        } else {
            ctx.body = new ErrorModel('获取失败')
        }
    }
}

module.exports = new User()