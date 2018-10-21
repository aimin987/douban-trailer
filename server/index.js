const Koa = require('koa');
//const ejs = require('ejs');
const pug = require('pug');

const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')

const app = new Koa()

app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = pug.render(pugTpl, {
        you: 'Luke',
        me: 'Aimin'
    })
})

app.listen(4455)