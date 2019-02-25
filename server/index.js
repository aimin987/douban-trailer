const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchemas } = require('./database/init');
const router = require('./routes/movie');

const app = new Koa();

/** 设置路由 */
app.use(router.routes()).use(router.allowedMethods());

(async () => {
    await connect();

    initSchemas();

    //require('./tasks/movies');
    // require('./tasks/api');
})();

/**配置界面路径 */
app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

/**路由 */
app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Luke',
        me: 'Aimin987'
    });
});

app.listen(4455)