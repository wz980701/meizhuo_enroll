const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

function handleError (err) {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connect();
      } else {
        console.log(err.stack || err);
      }
    }
  }
  
function connect () {
con = mysql.createPool(MYSQL_CONF)  // 创建连接
con.on('error', handleError)
}

let con
connect() // 开始连接

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