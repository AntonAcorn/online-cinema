import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ActorModel } from './actor.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  providers: [ActorService],
  controllers: [ActorController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ActorModel,
        schemaOptions: {
          collection: 'Actor',
        },
      },
    ]),
  ],
})
export class ActorModule {}
