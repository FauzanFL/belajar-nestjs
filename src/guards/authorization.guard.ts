import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getClass(), context.getHandler()])

    const user: any = request.user
    if(user.role !== requiredRoles) return false
    return true;
  }
}
