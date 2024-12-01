import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/role';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';
import { log } from 'console';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth(Role.Admin)
  async getProfile(@User('_id') id: string) {
    return this.userService.getById(id);
  }

  @Put('profile/update')
  @Auth()
  async updateProfile(
    @User('_id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateProfile(id, updateUserDto);
  }

  @Put('profile/update/:id')
  @Auth(Role.Admin)
  async updateProfileByAdmin(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto
  ) {
    return this.userService.updateProfile(id, updateDto);
  }
}
