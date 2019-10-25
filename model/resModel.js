class BaseModel {
    constructor (data, message) {
        if (typeof data === 'string') { // 若传入为string类型，则所传数据为空
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// 成功则状态码为1
class SuccessModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.code = 1
    }
}

// 一般错误状态码为0
class ErrorModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.code = 0
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}