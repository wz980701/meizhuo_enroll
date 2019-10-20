const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)  // 建立连接

con.connect()   // 开始连接

function exec (sql) {  // 执行sql语句函数
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}