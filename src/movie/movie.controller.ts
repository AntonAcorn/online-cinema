import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug);
  }
}
