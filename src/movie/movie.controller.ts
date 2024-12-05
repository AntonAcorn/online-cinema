import { Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Role } from 'src/user/role';
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller('movie')
export default class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug);
  }

  @Post()
  @Auth(Role.Admin)
  async create() {
    return this.movieService.create();
  }
}
