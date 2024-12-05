import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieModel } from './movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
  ) {}

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.movieModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('genres actors')
      .exec();
  }

  async getByActorId(actorId: Types.ObjectId) {
    return this.movieModel.find({ actors: actorId }).exec();
  }

  async getMovieBySlug(slug: string) {
    return this.movieModel.findOne({ slug }).populate('genre actors');
  }

  async getMovieByGenreIds(genreIds: Types.ObjectId[]) {
    return this.movieModel.find({ genres: { $in: genreIds } });
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

  async update(id: string, updateDto: CreateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async delete(id: string) {
    return this.movieModel.findByIdAndDelete(id);
  }
}
