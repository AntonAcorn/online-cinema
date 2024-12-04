/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ActorModel extends Base {}

export class ActorModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  slug: string;

  @prop()
  photo: string;
}
