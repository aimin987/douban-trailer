import { getAllMovies, getMovie } from '../service/movie';
const { controller, get, post, put } = require('../lib/decorator');

@controller('/api/v0/movies')
export class MovieController {
    @get('/')
    async getMovies(ctx, next) {
        const { type, year } = ctx.query;
        const movies = await getAllMovies(type, year);
        ctx.body = {
            movies
        }
    }

    @get('/:id')
    async getMovie(ctx, next) {
        const id = ctx.params.id;
        const movie = await getMovie(id);

        ctx.body = {
            movie
        }
    }
}
