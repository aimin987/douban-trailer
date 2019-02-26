const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

/**
 * 获取所有电影
 * @param {string} type 类型
 * @param {date} year 年份
 */
export const getAllMovies = async (type, year) => {
    let query = {};
    if (type) {
        query.movieTypes = {
            $in: [type]
        }
    }

    if (year) {
        query.year = year;
    }

    const movies = await Movie.find(query);
    return movies;
}

/**
 * 获取电影详情
 * @param {string} id 电影id
 */
export const getMovie = async(id) => {
    const movie = await Movie.findOne({ _id: id});
    return movie
}