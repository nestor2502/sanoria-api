import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergie } from './entities/user-allergy.entity';
import { Height_Log } from './entities/user-height.entity';
import { Weight_Log } from './entities/user-weight.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
     TypeOrmModule.forFeature([User, Allergie, Height_Log, Weight_Log])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
