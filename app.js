const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors')

//  路由
const auth = require('./routes/auth')
const user = require('./routes/user')
const interview = require('./routes/interview')

const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(koaBody({ multipart: true })) // 解析formdata与文件格式
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(
  cors({
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], 
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置
app.keys = ['Jeremy_Wu']
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: redisStore({
    all: `${REDIS_CONF.host}: ${REDIS_CONF.port}` // 即127.0.0.1:6379
  })
}))

// routes
app.use(auth.routes(), auth.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(interview.routes(), interview.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
