import { Controller, Get, Headers, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    ){
  }

  @Post()
  create(@Body() user: CreateUserDto){
    return this.userService.create(user);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string){
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() user: UpdateUserDto){
    return this.userService.update(userId, user);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string){
    return this.userService.remove(userId);
  }

}
