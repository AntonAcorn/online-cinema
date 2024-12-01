import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/role';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';

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

  @Get()
  @Auth(Role.Admin)
  async getAllUsers(@Query('option') searhTerm: string) {
    return this.userService.getAllUsers(searhTerm);
  }

  @Get('count-all')
  @Auth(Role.Admin)
  async getCountAllUsers() {
    return this.userService.getConutAllUsers();
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async deleteUserById(@Param('id') id: string) {
    this.userService.deleteById(id);
  }
}
