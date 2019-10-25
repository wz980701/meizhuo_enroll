const { SuccessModel, ErrorModel } = require('../model/resModel')

const _deepCopy = (obj) => {    // 深度拷贝对象
    return Object.assign({}, obj)
}

const _timeToTimestamp = () => {    // 当前时间转化成时间戳
    const timestamp = Math.round(new Date().getTime()/1000).toString()
    return timestamp
}

const _returnVal = ({ passData = false, successMsg, failMsg, data}) => {
    if (passData && data) {
        return new SuccessModel(data, successMsg)
    } else {
        return data ? new SuccessModel(successMsg) : new ErrorModel(failMsg)
    }
}

module.exports = {
    _deepCopy,
    _timeToTimestamp,
    _returnVal
}