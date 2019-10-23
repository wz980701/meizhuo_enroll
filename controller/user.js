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

// 默认limit为20，page为1
const getList = async ({ group, page = 1, limit = 20, state }) => {
    let start = (page - 1) * limit
    let condition = group ? `s_department=${group} and s_state=${state}` 
                          :  `s_state=${state}`    // 判断是否有group参数
    let sql_1 = `
        select 
        id, s_id, s_name, s_major, s_grade, s_department, s_createtime, s_apply
        from user where ${condition}
        order by s_createtime limit ${start}, ${limit};
    `
    let sql_2 = `
        select count(*) as sum from user where ${condition}
    `
    const user_list = await exec(sql_1)
    const user_num = await exec(sql_2)
    return {
        user_list,
        sum: user_num[0].sum
    }
}

const getDetail = async (id) => {
    let sql = `
        select
        s_id, s_name, s_major, s_grade, s_department, s_number, s_intro
        from user where id=${id};
    `
    const user_detail = await exec(sql)
    return user_detail[0] || {}
}

module.exports = {
    addUser,
    getList,
    getDetail
}