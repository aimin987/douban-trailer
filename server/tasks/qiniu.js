const qiniu = require('qiniu');
const nanoid = require('nanoid');
const config = require('../config');

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);

const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err);
            } else {
                if (info.statusCode == 200) {
                    resolve({ key });
                } else {
                    reject(info);
                }
            }
        });
    });
};

(async () => {
    let movies = [
        {
            video: 'http://vt1.doubanio.com/201811031602/5de6ef0292706ce657608fe6545c3ca5/view/movie/M/402330799.mp4',
            doubanId: '5300054',
            cover: 'https://img3.doubanio.com/img/trailer/medium/2528229036.jpg?',
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2522138824.jpg'
        }
    ];

    movies.map(async movie => {
        if (movie.video && !movie.key) {
            try {
                let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4'); let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png'); let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png');
                if (videoData.key) {
                    movie.videoKey = videoData.key;
                }

                if (coverData.key) {
                    movie.coverKey = coverData.key;
                } 
                
                if (posterData.key) {
                    movie.posterKey = posterData.key;
                }

                console.log(movie);
                
            } catch (error) {
                console.log(error);
            }
        }
    })
})();