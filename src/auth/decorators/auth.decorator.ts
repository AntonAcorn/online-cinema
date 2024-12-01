import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Role } from 'src/user/role';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (role?: Role) => {
  if (role === Role.Admin) {
    return applyDecorators(UseGuards(JwtGuard, RolesGuard), Roles(Role.Admin));
  }
  return applyDecorators(UseGuards(JwtGuard));
};
