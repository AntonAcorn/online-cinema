import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { GenreModel } from './genre.model';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
  ) {}

  async getAllGenres(searhTerm?: string) {
    let options = {};
    if (searhTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searhTerm, 'i'),
          },
          {
            description: new RegExp(searhTerm, 'i'),
          },
          {
            slug: new RegExp(searhTerm, 'i'),
          },
        ],
      };
    }

    const query = this.GenreModel.find(options)
      .select('-__v')
      .sort({ createdAt: 'desc' });

    console.log(query.getQuery());
    console.log(query.getOptions());
    return query;
  }
}
