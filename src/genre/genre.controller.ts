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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/createGenre.dto';
import { UpdateGenreDto } from './dto/updateGenre.dto';
import { Role } from 'src/user/role';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @Auth()
  async getAll(@Query('option') option: string) {
    return this.genreService.getAllGenres(option);
  }

  @Get('slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getGenreBySlug(slug);
  }

  @Get('collections')
  @Auth()
  async getCollections() {
    return this.genreService.getCollections();
  }

  @Get(':id')
  @Auth(Role.Admin)
  async getById(@Param('id') id: string) {
    return this.genreService.getGenreById(id);
  }

  @Post('create')
  // @Auth(Role.Admin)
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Put('update/:id')
  @Auth(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    return this.genreService.updateGenre(id, updateGenreDto);
  }

  @Delete('delete/:id')
  @Auth(Role.Admin)
  async deleteById(@Param('id') id: string) {
    return this.genreService.deleteGenreById(id);
  }
}
