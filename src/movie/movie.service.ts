import { Injectable } from '@nestjs/common';
import { MovieModel } from './movie.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
  ) {}
  async getBySlug(slug: string) {
    return this.movieModel.findOne({ slug }).populate('genre actors');
  }
}
