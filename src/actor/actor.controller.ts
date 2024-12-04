import { Controller, Get, Query } from '@nestjs/common';
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

  async getBySlug() {
    return this.actorService.getBySlug();
  }

  async getById() {
    return this.actorService.getById();
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
