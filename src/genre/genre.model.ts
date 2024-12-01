/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  slug: string;

  @prop({ required: true })
  description: string;
}
