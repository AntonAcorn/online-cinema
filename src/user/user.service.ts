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

  async getAllUsers(searhTerm?: string) {
    let options = {};
    if (searhTerm) {
      options = {
        $or: [
          {
            email: new RegExp(searhTerm, 'i'),
          },
        ],
      };
    }

    const query = this.UserModel.find(options)
      .select('-password -__v')
      .sort({ createdAd: 'desc' });

    console.log(query.getQuery());
    console.log(query.getOptions());
    return query;
  }

  async getConutAllUsers() {
    return this.UserModel.find().countDocuments();
  }

  async deleteById(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }
}

async function encryptPassword(password: string) {
  const passwordSalt = await genSalt();
  return await hash(password, passwordSalt);
}
