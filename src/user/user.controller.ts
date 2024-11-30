import { Body, Controller, Get, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserService } from './user.service';
import { Role } from 'src/common/role';
import { User } from './decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth(Role.Admin)
  async getProfile(@User('_id') id: string) {
    return this.userService.getById(id);
  }

  @Put('update')
  @Auth()
  async updateProfile(id: string, @Body()) {}
}
