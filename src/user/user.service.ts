import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateUserDto } from './dto/user.update.dto';
import { genSalt, hash } from 'bcryptjs';
import { Role } from './role';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async getById(id: string) {
    const user = this.UserModel.findById(id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const profileToUpdate = await this.getById(id);
    profileToUpdate.email = updateUserDto.email;
    profileToUpdate.password = await encryptPassword(updateUserDto.password);
    if (updateUserDto.role === Role.Admin) {
      profileToUpdate.role = updateUserDto.role;
    }
    try {
      return await profileToUpdate.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

async function encryptPassword(password: string) {
  const passwordSalt = await genSalt();
  return await hash(password, passwordSalt);
}
