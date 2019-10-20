const { exec } = require('../db/mysql')

const { _timeToTimestamp } = require('../utils/_common')

const addUser = async (user_data) => {  // 面试者报名
    let sql = `
        insert into user 
        (s_name, s_id, s_major, s_number, s_grade, s_department, s_intro, s_createtime)
        values (
    `
    Object.keys(user_data).forEach((key) => {
        sql += `${user_data[key]},`
    })
    sql += `${_timeToTimestamp()});`
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    addUser
}