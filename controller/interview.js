const { exec } = require('../db/mysql')

const ToLogin = async (username, password) => {   // 面试官登录
    let sql = `
    select h_username from interviewer where h_username=${username} and h_password=${password};
    `
    const data = await exec(sql)
    return data[0] || {}
}

const getList = async () => {
    let sql = 'select * from state'
    const data = await exec(sql)
    return data
}

module.exports = {
    ToLogin,
    getList
}