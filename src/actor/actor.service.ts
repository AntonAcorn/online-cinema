import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ActorModel } from './actor.model';
import { CreateActorDto } from './dto/createActor.dto';
import { UpdateActorDto } from './dto/updateActor.dto';

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

  async createActor(createActorDto: CreateActorDto) {
    const actorToCreate = new this.ActorModel({
      name: createActorDto.name,
      slug: createActorDto.slug,
      photo: createActorDto.photo,
    });

    return actorToCreate.save();
  }

  async updateActor(updateActorDto: UpdateActorDto, id: string) {
    const actorToUpdate = await this.ActorModel.findById(id);
    if (!actorToUpdate) {
      throw new NotFoundException('Actor was not found');
    }

    actorToUpdate.name = updateActorDto.name;
    actorToUpdate.slug = updateActorDto.slug;
    actorToUpdate.photo = updateActorDto.photo;

    return actorToUpdate.save();
  }
}
