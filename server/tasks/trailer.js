const cp = require('child_process');
const { resolve } = require('path');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');

(async () => {

    let movies = await Movie.find({
        $or:[
            {video:{$exists: false}},
            {video: null}
        ]
    }).exec();

    const script = resolve(__dirname, '../crawler/video');
    const child = cp.fork(script, []);
    let invoked = false;

    child.on('error', err => {
        if (invoked) {
            return;
        }
        invoked = true;
        console.log(err);
    });

    child.on('exit', code => {
        if (invoked) {
            return;
        }
        invoked = false;
        let err = code === 0 ? null : new Error('exit code ' + code);
        if (err) {
            console.log(err);
        }
    });

    child.on('message', async data => {
        let doubanId = data.doubanId;

        console.log(data);
        let movie = await Movie.findOne({
            doubanId: doubanId
        }).exec();


        if (data.video) {
            movie.video = data.video;
            movie.cover = data.cover;

            await movie.save();
        } else {
            await movie.remove();
        }
    });

    child.send(movies);
})();