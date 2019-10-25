const { SuccessModel, ErrorModel } = require('../model/resModel')

const {
    getNextUser,
    toChangeState,
    toLogin,
    getList,
    toLogout
} = require('../controller/interview')

const { _returnVal } = require('../utils/_common')

class Interview {
    constructor () {
        this.nextUser = this.nextUser.bind(this)
        this.changeState = this.changeState.bind(this)
        this.logout = this.logout.bind(this)
        this.delSession = this.delSession.bind(this)
    }
    async nextUser (ctx, next) {
        const user_data = await getNextUser()   // 获取sign_list已签到状态的第一条的具体数据
        if (user_data) {    // 如果获取成功，则改变其状态
            const res_prev = await this.changeState(ctx.query.id, '已面试'), // 面试完的
                  res_next = await this.changeState(user_data.s_id, '面试中')   // 下一个要面试的
            ctx.body = _returnVal({
                passData: res_prev && res_next,
                successMsg: '获取信息成功',
                failMsg: '获取信息失败',
                data: user_data
            })
        } else {
            ctx.body = new ErrorModel('获取信息失败')
        }
    }
    async changeState (id, state) { // 修改状态
        if (!id) return true    // 第一次登录时默认不传id
        const val = await toChangeState(id, state)
        return val
    }
    async login (ctx, next) {
        const { department, group } = ctx.request.body
        const data = await toLogin(department, group)
        if (data) {
            ctx.session.department = department
            ctx.session.group = group
            ctx.body = new SuccessModel('登录成功')
        } else {
            ctx.body = new ErrorModel('登录失败')
        }
    }
    async list (ctx, next) {
        const data = await getList()
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取面试官列表成功',
            failMsg: '获取面试官列表失败',
            data: data
        })
    }
    async logout (ctx, next) {
        const { department, group } = ctx.query
        const data = await toLogout(department, group)
        this.delSession(ctx)
        ctx.body = _returnVal({
            successMsg: '登出成功',
            failMsg: '登出失败',
            data: data
        })
    }
    delSession (ctx) {  // 删除session中的department跟group
        ctx.session.department = ''
        ctx.session.group = ''
    }
}

module.exports = new Interview()