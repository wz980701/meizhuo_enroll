const { exec } = require('../db/mysql')

const { _timeToTimestamp } = require('../utils/_common')

const addUser = async (user_data) => {  // 面试者线上报名
    let sql = `
        insert into user 
        (s_department, s_grade, s_name, s_id, s_major, s_number, s_intro, s_createtime)
        values
        (
    `
    Object.keys(user_data).forEach((key) => {
        sql += `'${user_data[key]}',`
    })
    sql += `${_timeToTimestamp()});`
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

// 默认limit为20，page为1
const getList = async ({ group, page = 1, limit = 10, state }) => {
    const start = (page - 1) * limit
    let condition
    if (group) {
        condition = state ? `where s_department='${group}' and s_state='${state}'` : `where s_department='${group}'`
    } else {
        condition = state ? `where s_state='${state}'` : ''
    }
    const sql_list = `
        select 
        id, s_id, s_name, s_major, s_grade, s_department, s_createtime, s_apply, s_pass
        from user ${condition}
        order by s_createtime limit ${start}, ${limit};
    `
    const sql_sum = `
        select count(*) as sum from user ${condition}
    `
    const user_list = await exec(sql_list)
    const user_num = await exec(sql_sum)
    return {
        user_list: user_list || [],
        sum: user_num[0].sum || 0
    }
}

const getDetail = async (id) => {
    const sql = `
        select
        s_id, s_name, s_major, s_grade, s_department, s_number, s_intro, s_apply, s_state
        from user where id=${id};
    `
    const user_detail = await exec(sql)
    return user_detail[0] || {}
}

const checkUser = async (id) => {
    const sql = `
        update user set s_state='已签到' where s_id=${id};
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

const toSignIn = async (id) => {
    const sql = `
        insert into sign_list
        (s_department, s_name, s_id, s_state)
        select 
        s_department, s_name, s_id, s_state
        from user where s_id=${id};
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

const addOfflineUser = async ({name, id, group}) => {
    const sql = `
        insert into user
        (s_name, s_id, s_department, s_createtime, s_state, s_apply)
        values (
            '${name}', '${id}', '${group}', ${_timeToTimestamp()}, '已签到', '线下报名'
        );
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

const getSignList = async () => {
    const arr = await getDepartmentList()
    let data = {}
    for (let item of arr) {    //  遍历组别列表
        const sql = `
            select s_id, s_name, s_state from sign_list where s_department='${item}';
        `
        const val = await exec(sql) // 根据所报组别不同获取列表
        data[item] = val
    }
    return data
}

const getDepartmentList = async () => {
    const sql = `
        select d_name from department;
    `
    const data = await exec(sql)
    const arr = data.map((item) => {
        return item["d_name"]
    })
    return arr || []
}

const delFromSignList = async (id) => {
    const sql = `
        delete from sign_list where s_id=${id};
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

const getSearchResult = async ({val, page = 1, limit = 20}) => {
    const start = (page - 1) * limit,
          condition = `s_id like '%${val}%' or s_name like '%${val}%'`
    const sql_list = `
        select 
        id, s_id, s_name, s_major, s_grade, s_department, s_createtime, s_apply
        from user
        where ${condition} order by s_createtime limit ${start}, ${limit};
    `,
          sql_sum = `
        select count(*) as sum from user where ${condition};
    `
    const list = await exec(sql_list),
          sum = await exec(sql_sum)
    return {
        data: list || [],
        sum: sum[0].sum || 0
    }
}

const getInterviewResult = async (value) => {
    const sql = `
        select s_result from user where s_id = '${value}' or s_name = '${value}';
    `
    const data = await exec(sql)
    return data[0] || {}
}

const setInterviewResult = async (department, result, pass) => {
    const sql = `
        update user set s_result='${result}' 
        where s_department='${department}' and s_pass='${pass}' and s_state='已面试';
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

const getGradeList = async () => {
    const sql = `
        select g_name from grade;
    `
    const data = await exec(sql)
    const arr = data.map((item) => {
        return item["g_name"]
    })
    return arr || []
}

const getGroupList = async () => {
    const sql = `
        select h_group from interviewer_group;
    `
    const data = await exec(sql)
    const arr = data.map((item) => {
        return item["h_group"]
    })
    return arr || []
}

const changePassState = async (id, state) => {
    const sql = `
        update user set s_pass='${state}' where id=${id}
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

module.exports = {
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
    getDepartmentList,
    getGradeList,
    getGroupList,
    changePassState
}