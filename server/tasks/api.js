
//const url = 'http://api.douban.com/v2/movie/subject/1764796';

const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
    const res = await rp(url);

    return res;
}


; (async () => {
    console.log('开始');
    let movies = [{
        doubanId: 30181133,
        title: '逆流而上的你',
        rate: 6,
        poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2547257418.jpg'
    },
    {
        doubanId: 30327898,
        title: '耀眼',
        rate: 8.5,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2546066840.jpg'
    }];

    movies.map(async movie => {
        let movieData = await fetchMovie(movie);
        try {
            movieData = JSON.parse(movieData);
            console.log(movieData.tags);
            console.log(movieData.summary);
        } catch (err) {
            console.log(err);
        }

    });
})();