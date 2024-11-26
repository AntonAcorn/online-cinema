/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, unique: true })
  password: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ type: () => [String], default: [] })
  favorites?: [];
}
