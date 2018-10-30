
//const url = 'http://api.douban.com/v2/movie/subject/1764796';

const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
    const res = await rp(url);

    return res;
}

(async () => {

    let movies = [];

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
});