import { Controller, Get, Req } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserService } from './user.service';
import { Role } from 'src/common/role';
import { Roles } from "./decorators/roles.decorator";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth(Role.Admin)
  async getProfile(@Req() request: Request) {
    const authHeader = request.headers;

    console.log('Token:', authHeader);

    return 'Hey admin';
  }
}
