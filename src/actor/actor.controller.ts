import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

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

  async createActor() {
    return this.actorService.createActor();
  }

  async updateActor() {
    return this.actorService.updateActor();
  }

  async deleteActor() {
    return this.actorService.deleteActor();
  }
}
