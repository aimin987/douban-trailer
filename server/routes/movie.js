import { getAllMovies, getMovie } from '../service/movie';
const { controller, get, post, put } = require('../lib/decorator');

@controller('/api/v0')
export class MovieController {
    @get('/all')
    async getMovies(ctx, next) {
        const { type, year } = ctx.query;
        const movies = await getAllMovies(type, year);
        ctx.body = {
            movies
        }
    }

    @get('/detail/:id')
    async getMovie(ctx, next) {
        const id = ctx.params.id;
        const movie = await getMovie(id);

        ctx.body = {
            data: {
                movie
            },
            success: true
        }
    }
}
