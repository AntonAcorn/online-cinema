import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { hash, compare, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly UserModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
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

    const tokens = await this.issueTokenPair(newUser.id);

    return {
      user: this.getUsersFields(newUser),
      ...tokens,
    };
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

  async issueTokenPair(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '15m',
    });
    return { refreshToken, accessToken };
  }

  getUsersFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
