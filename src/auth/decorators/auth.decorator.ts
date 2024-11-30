import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Role } from 'src/common/role';

export const Auth = (role?: Role) => {
  if (role === Role.Admin) {
    return applyDecorators(UseGuards(JwtGuard, RolesGuard), Roles(Role.Admin));
  }
  return applyDecorators(UseGuards(JwtGuard));
};
