import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
    constructor(
        private jwtService: JwtService,
        private userService: UserService){}

    async login(user: any) {
        console.log(user)
        user = user.body;
        const payload = { username: user.username, sub: user.email };
        const accessToken = this.jwtService.sign(payload);
        await this.userService.login({name: user.username, token: accessToken})
        return {
          access_token: accessToken,
        };
    }

      async logout(userId: string, req: any) {
        await this.userService.logout(userId);
        return {
          status: "ok"
        };
      }

}
