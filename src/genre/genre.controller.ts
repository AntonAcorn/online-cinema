import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @Auth()
  async getAll(@Query('option') option: string) {
    return this.genreService.getAllGenres(option);
  }

  // @Get('slug')
  // @Auth()
  // async getBySlug() {
  //   return this.genreService.getBySlug();
  // }

  // @Get('collections')
  // @Auth()
  // async getCollections() {
  //   return this.genreService.getCollections();
  // }

  // @Get(':id')
  // @Auth(Role.Admin)
  // async getById() {
  //   return this.genreService.getById();
  // }

  // @Post()
  // @Auth(Role.Admin)
  // async create() {
  //   return this.genreService.create();
  // }

  // @Put(':id')
  // @Auth(Role.Admin)
  // async update() {
  // 	return this.genreService.update(id, updateDto: UpdateDto)
  // }

  // @Delete(':id')
  // @Auth(Role.Admin)
  // async deleteById() {}
}
