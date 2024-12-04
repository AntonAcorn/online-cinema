import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ActorModel } from './actor.model';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
  ) {}
  async getAll(searchTerm?: string) {
    let options = {};
    if (searchTerm) {
      options = {
        $or: [
          {
            name: RegExp(searchTerm, 'i'),
          },
          {
            slug: RegExp(searchTerm, 'i'),
          },
        ],
      };
    }
    return this.ActorModel.find(options);
  }

  async getBySlug(slug: string) {
    const actorBySlug = await this.ActorModel.findOne({ slug });
    if (!actorBySlug) {
      throw new NotFoundException('Actor was not found');
    }
    return actorBySlug;
  }

  async getActorById(id: string) {
    const actorById = await this.ActorModel.findById(id);
    if (!actorById) {
      throw new NotFoundException('Actor was not found');
    }
    return actorById;
  }
}
