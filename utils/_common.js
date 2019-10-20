const _deepCopy = (obj) => {    // 深度拷贝对象
    return Object.assign({}, obj)
}

const _timeToTimestamp = () => {
    const timestamp = Math.round(new Date().getTime()/1000).toString()
    return timestamp
}

module.exports = {
    _deepCopy,
    _timeToTimestamp
}