const { exec } = require('../db/mysql')

const getNextUser = async () => {
    let sql = `
        select 
        s_id, s_name, s_major, s_grade, s_department, s_number, s_intro, s_apply, s_state 
        from user
        where s_id = (
        select s_id from sign_list where s_state='已签到' limit 1);
    `
    const data = await exec(sql)
    data[0].s_state = '面试中'
    return data[0] || {}
}

const toChangeState = async (id, state) => {
    let sql = `
        update 
        user, sign_list 
        set user.s_state='${state}',sign_list.s_state='${state}'
        where user.s_id=${id} and user.s_id=sign_list.s_id;
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

const toLogin = async (department, group) => {
    const is_exist = await checkLogin(department, group)
    if (!is_exist) {    // 如果没有登录，则插入到列表中
        let sql = `
            insert into interviewer_list
            (h_department, h_group) values
            (${department}, ${group});
        `
        const data = await exec(sql)
        if (data.affectedRows > 0)
            return true
    }
    return false
}

const checkLogin = async (department, group) => {   // 判断是否已经登录了的
    let sql = `
        select 1 from interviewer_list
        where h_department=${department} and h_group=${group} limit 1;
    `
    const data = await exec(sql)
    if (data.length > 0) return true
    return false
}

const getList = async () => { 
    let sql1 = `
        select h_group, h_department from interviewer_list
    `
    let sql2 = `
        select count(*) as sum from interviewer_list
    `
    const list = await exec(sql1)
    const sum = await exec(sql2)
    return {
        data: list,
        sum: sum[0].sum
    } || {}
}

const toLogout = async (department, group) => {
    let sql = `
        delete from interviewer_list where
        h_department=${department} and h_group=${group};
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) return true
    return false
}

module.exports = {
    getNextUser,
    toChangeState,
    toLogin,
    getList,
    toLogout
}