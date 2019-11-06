const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
    addUser,
    getList,
    getDetail,
    checkUser,
    toSignIn,
    addOfflineUser,
    getSignList,
    delFromSignList,
    getSearchResult,
    getInterviewResult,
    setInterviewResult,
    getGradeList,
    getDepartmentList,
    getGroupList
} = require('../controller/user')
const { _deepCopy, _returnVal } = require('../utils/_common')

class User {
    constructor () {
    }
    async apply (ctx, next) {
        const user_data = _deepCopy(ctx.request.body)
        console.log(user_data)
        const val = await addUser(user_data)
        ctx.body = _returnVal({
            successMsg: '报名成功',
            failMsg: '报名失败',
            data: val
        })
    }
    async list (ctx, next) {
        const val = await getList(ctx.query)
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async detail (ctx, next) {
        const val = await getDetail(ctx.query.id)   // 获取面试者id
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async signIn (ctx, next) {
        const id = ctx.request.body.id
        const is_exist = await checkUser(id)   // 查看面试者是否已线上报名，若有，则插入签到列表
        if (is_exist) {
            const val = await toSignIn(id)
            ctx.body = _returnVal({
                successMsg: '签到成功',
                failMsg: '签到失败',
                data: val
            })
        } else {
            const res = await addOfflineUser(ctx.request.body)  // 处理线下报名的面试者
            if (res) {  // 如果成功，则将其插入签到列表
                const val = await toSignIn(id)
                ctx.body = _returnVal({
                    successMsg: '签到成功',
                    failMsg: '签到失败',
                    data: val
                })
            } else {
                ctx.body = new ErrorModel('签到失败')
            }
        }
    }
    async signList (ctx, next) {
        const val = await getSignList()
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async delSignUser (ctx, next) {
        const val = await delFromSignList(ctx.query.id)
        ctx.body = _returnVal({
            successMsg: '删除成功',
            failMsg: '删除失败',
            data: val
        })
    }
    async search (ctx, next) {
        const val = await getSearchResult(ctx.query)
        ctx.body = _returnVal({
            passData: true,
            successMsg: '搜索成功',
            failMsg: '搜索失败',
            data: val
        })
    }
    async getResult (ctx, next) {
        const val = await getInterviewResult(ctx.query.id)
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async setResult (ctx, next) {
        const { id, result } = ctx.request.body
        const val = await setInterviewResult(id, result)
        ctx.body = _returnVal({
            successMsg: '更新成功',
            failMsg: '更新失败',
            data: val
        })
    }
    async gradeList (ctx, next) {
        const val = await getGradeList()
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async departmentList (ctx, next) {
        const val = await getDepartmentList()
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取成功',
            failMsg: '获取失败',
            data: val
        })
    }
    async groupList (ctx, next) {
        const val = await getGroupList()
        ctx.body = _returnVal({
            passData: true,
            successMsg: '获取列表成功',
            failMsg: '获取列表失败',
            data: val
        })
    }
}

module.exports = new User()