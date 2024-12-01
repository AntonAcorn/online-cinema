import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { GenreModel } from './genre.model';
import { CreateGenreDto } from './dto/createGenre.dto';
import { UpdateGenreDto } from './dto/updateGenre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
  ) {}

  async getGenreById(id: string) {
    const genreToFind = await this.GenreModel.findById(id);
    if (!genreToFind) {
      throw new NotFoundException('Genre was not found');
    }

    return genreToFind;
  }

  async getGenreBySlug(slug: string) {
    const genreBySlug = await this.GenreModel.findOne({ slug });
    if (!genreBySlug) {
      throw new NotFoundException('Genre was not found');
    }
    return genreBySlug;
  }

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

  async getCollections() {
    const collections = {};
    // const genres = await this.getAll();

    // const collections = await Promise.all(
    //   genres.map(async (genre) => {
    //     const moviesByGenre = await this.movieService.byGenres([genre._id]);

    //     const result: ICollection = {
    //       _id: String(genre._id),
    //       title: genre.name,
    //       slug: genre.slug,
    //       image: moviesByGenre[0].bigPoster,
    //     };

    //     return result;
    //   })
    // );

    return collections;
  }

  async createGenre(createGenreDto: CreateGenreDto) {
    const genreToCreate = new this.GenreModel({
      name: createGenreDto.name,
      slug: createGenreDto.slug,
      description: createGenreDto.description,
    });

    return genreToCreate.save();
  }

  async updateGenre(id: string, updateGenreDto: UpdateGenreDto) {
    const genreToUpdate = await this.GenreModel.findById(id);
    genreToUpdate.name = updateGenreDto.name;
    genreToUpdate.slug = updateGenreDto.slug;
    genreToUpdate.description = updateGenreDto.description;

    return genreToUpdate.save();
  }

  async deleteGenreById(id: string) {
    return this.GenreModel.findByIdAndDelete(id);
  }
}
