import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/role';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export default class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get(':id')
  // @Auth(Role.Admin)
  async getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  @Get('slug/:slug')
  async getByMovieSlug(@Param('slug') slug: string) {
    return this.movieService.getMovieBySlug(slug);
  }

  @Get('actor/:actorId')
  async getMovieByActorId(@Param('actorId') actorId: Types.ObjectId) {
    return this.movieService.getByActorId(actorId);
  }

  @Post('by-genres')
  async getMovieByGenreIds(@Body('genreIds') genreIds: Types.ObjectId[]) {
    return this.movieService.getMovieByGenreIds(genreIds);
  }

  @Post('create')
  // @Auth(Role.Admin)
  async create() {
    return this.movieService.create();
  }

  @Put('update/:id')
  // @Auth(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }

  @Post('increment-opening')
  async updateOpening(@Body('slug') slug: string) {
    return this.movieService.incrementCountOpening(slug);
  }

  @Get('/special/most-popular')
  async getMostPopularMovie() {
    return this.movieService.getMostPopularMovie();
  }
}
