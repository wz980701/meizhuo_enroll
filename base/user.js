const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
    addUser,
    getList,
    getDetail,
    toSignIn,
    addOfflineUser
} = require('../controller/user')
const { _deepCopy } = require('../utils/_common')

class User {
    constructor () {
        this.apply.bind(this)
        this.list.bind(this)
        this.detail.bind(this)
        this.signIn.bind(this)
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
    async signIn (ctx, next) {
        const res = await toSignIn(ctx.request.body.id)
        if (res) {
            ctx.body = new SuccessModel('签到成功')
        } else {
            const res = await addOfflineUser(ctx.request.body)  // 处理线下报名的面试者
            if (res) {
                ctx.body = new SuccessModel('签到成功')
            } else {
                ctx.body = new ErrorModel('签到失败')
            }
        }
    }
}

module.exports = new User()