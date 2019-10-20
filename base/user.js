const { SuccessModel, ErrorModel } = require('../model/resModel')
const { addUser } = require('../controller/user')
const { _deepCopy } = require('../utils/_common')

class User {
    constructor () {
        this.apply.bind(this)
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
}

module.exports = new User()