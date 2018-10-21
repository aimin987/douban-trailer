const Koa = require('koa');
const { normal } = require('./tpl')

const app = new Koa()

app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = normal
})

app.listen(4455)