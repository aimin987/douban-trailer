const mongoose = require('mongoose');
const db = 'mongodb://localhost/douban-trailer';

mongoose.Promise = global.Promise;

exports.connect = () => {

    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        mongoose.connect(db, {
            useNewUrlParser: true
        });

        /**
         * 断开连接
         */
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes += 1;
            if (maxConnectTimes < 5) {
                mongoose.connect(db, {
                    useNewUrlParser: true
                });
            } else {
                throw new Error('数据库挂了吧，快去修吧少年。')
            }
        });

        /**
         * 数据库错误
         */
        mongoose.connection.on('error', err => {
            maxConnectTimes += 1;

            if (maxConnectTimes < 5) {
                mongoose.connect(db, {
                    useNewUrlParser: true
                });
            } else {
                throw new Error('数据库挂了吧，快去修吧少年。')
            }

            //reject(err);
        });

        /**
         * 数据库打开成功
         */
        mongoose.connection.once('open', () => {
            const Dog = mongoose.model('Dog', {name: String});
            const doga = new Dog({name: '阿尔法'});
            doga.save().then(()=>{
                console.log('Wang');
            });

            resolve();
            console.log('MongoDB Connected successfully');
        });
    });
}