import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/emuns/role.emun';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: User = context.switchToHttp().getRequest().user;
    const userRole = this.getUserRole(user);

    return requiredRoles.includes(userRole);
  }

  private getUserRole(user: User): Role {
    const isAdmin = user.isAdmin;
    return isAdmin ? Role.ADMIN : Role.USER;
  }
}
