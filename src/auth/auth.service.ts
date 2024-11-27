import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { hash, compare, genSalt } from 'bcryptjs';
import { AppLogger } from 'src/common/app.logger';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly UserModel: ModelType<UserModel>,
    private readonly logger: AppLogger
  ) {}

  async register(authDto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ email: authDto.email });
    if (oldUser) {
      throw new BadRequestException('User with this emails is already exist');
    }

    const passwordSalt = await genSalt();
    const hashPassword = await hash(authDto.password, passwordSalt);

    const newUser = new this.UserModel({
      email: authDto.email,
      password: hashPassword,
    });
    return newUser.save();
  }

  async login(authDto: AuthDto) {
    const user = await this.UserModel.findOne({ email: authDto.email });
    if (!user) {
      throw new NotFoundException('User was not found');
    }

    const isPasswordValid = await compare(authDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return user;
  }
}
