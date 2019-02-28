const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const R = require('ramda');

const { connect, initSchemas } = require('./database/init');

/** 
 * 设置路由
 */
const MIDDLEWARES = ['router', 'parcel'];
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

/**
 * 开启服务器
 */
async function start() {
    // 数据库连接
    await connect();
    initSchemas();

    const app = new Koa();
    await useMiddlewares(app);
    app.listen(4455)
}

start();


// /**配置界面路径 */
// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }));
