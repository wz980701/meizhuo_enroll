const env = process.env.NODE_ENV    // 环境参数

let MYSQL_CONF   // mysql配置
let REDIS_CONF  // redis配置

if (env === 'dev') {    // 生产环境
    MYSQL_CONF = {
        host: '47.103.12.86',
        user: 'root',
        password: '138290Wz..0',
        port: '3306',
        database: 'meizhuo_enroll'
    }
    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
}

if (env === 'production') { // 线上环境
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '138290Wz..0',
        port: '3306',
        database: 'meizhuo_enroll'
    }
    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}