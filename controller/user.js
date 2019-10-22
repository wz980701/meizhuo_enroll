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

const getList = async ({ group, page = 1, limit = 20 }) => {
    let start = (page - 1) * limit
    let condition = group ? ` where s_department=${group} ` : ''
    let sql_1 = `
        select 
        id, s_id, s_name, s_major, s_grade, s_department, s_createtime
        from user ${condition}
        order by s_createtime limit ${start}, ${limit};
    `
    let sql_2 = `
        select count(*) as sum from user ${condition}
    `
    const user_list = await exec(sql_1)
    const user_num = await exec(sql_2)
    return {
        user_list,
        sum: user_num[0].sum
    }
}

module.exports = {
    addUser,
    getList
}