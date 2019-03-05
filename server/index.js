const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const R = require('ramda');

import config from './config';

/** 
 * 设置路由
 */
const MIDDLEWARES = ['database', 'genneral', 'router'];
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
    const app = new Koa();
    const { port } = config;

    await useMiddlewares(app);

    const server = app.listen(port, ()=>{
        console.log(
            process.env.NODE_ENV == 'development' 
                ? `Open ${chalk.green('http://localhost:' + port)}`
                : `App listening on port ${port}`
        )

        //require('./tasks/qiniu');
    })
}

start();