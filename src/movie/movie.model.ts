/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ActorModel } from 'src/actor/actor.model';
import { GenreModel } from 'src/genre/genre.model';

export interface MovieModel extends Base {}

export class Parameter {
  @prop()
  year: number;

  @prop()
  duration: number;

  @prop()
  country: string;
}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string;

  @prop()
  bigPoster: string;

  @prop()
  title: string;

  @prop()
  parameters: Parameter;

  @prop({ default: 4.0 })
  rating?: number;

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[];

  @prop({ default: 0 })
  countOpened?: number;

  @prop()
  videoUrl: string;

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[];

  @prop()
  slug: string;

  @prop({ default: false })
  isSendTelegram?: boolean;
}
