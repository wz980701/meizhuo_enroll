const { exec } = require('../db/mysql')

const getUser = async () => {
    let sql = `select * from interviewer;`
    const data = await exec(sql)
    return data
}

module.exports = {
    getUser
}