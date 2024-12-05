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
import { Role } from 'src/user/role';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/createActor.dto';
import { UpdateActorDto } from './dto/updateActor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  @Auth()
  async getAll(@Query('option') option: string) {
    return this.actorService.getAll(option);
  }

  @Get('slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug);
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.actorService.getActorById(id);
  }

  @Post('create')
  // @Auth(Role.Admin)
  async createActor(@Body() createActorDto: CreateActorDto) {
    return this.actorService.createActor(createActorDto);
  }

  @Put('update/:id')
  @Auth(Role.Admin)
  async updateActor(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto
  ) {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @Delete('delete/:id')
  @Auth(Role.Admin)
  async deleteActor(@Param('id') id: string) {
    return this.actorService.deleteActorById(id);
  }
}
