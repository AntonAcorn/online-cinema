import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/user/decorators/roles.decorator';
import { Role } from 'src/user/role';
import { UserModel } from 'src/user/user.model';

@Injectable()
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserModel = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You have no rights!');
    }

    return true;
  }
}
