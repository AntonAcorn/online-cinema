import { Injectable } from '@nestjs/common';
import { MovieModel } from './movie.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
  ) {}
  async getBySlug(slug: string) {
    return this.movieModel.findOne({ slug }).populate('genre actors');
  }

  async create() {
    const defaultMovie: CreateMovieDto = {
      bigPoster: '',
      actors: [],
      genres: [],
      description: '',
      poster: '',
      title: '',
      videoUrl: '',
      slug: '',
    };

    const movie = await this.movieModel.create(defaultMovie);
    return movie._id;
  }
}
