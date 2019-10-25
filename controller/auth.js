const { exec } = require('../db/mysql')

const toLogin = async (username, password) => {   // hr登录
    let sql = `
    select h_username from interviewer where h_username=${username} and h_password=${password};
    `
    const data = await exec(sql)
    return data[0] || {}
}

module.exports = {
    toLogin
}