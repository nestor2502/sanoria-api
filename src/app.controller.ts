import { Controller, Get, Param, Post, Request, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @Post('auth/logout/:userId')
  async logout(@Param('userId') userId: string, @Request() req) {
    return this.authService.logout(userId, req);
  }


}
