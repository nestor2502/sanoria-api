import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ){
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const autHeaderToken = request.header('Access-Token')
    const userId = request.header('userId')
    if(!userId){
      throw new ForbiddenException()
    }
    const user = await this.userService.findOne(userId)
    if(!user || !user.token || user.token != autHeaderToken){
      throw new ForbiddenException("Invalid Access Token")
    }
    return true;
  }
}
