import { Controller, Get, Headers, Post, Body, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    ){
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: CreateUserDto){
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string){
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() user: UpdateUserDto){
    return this.userService.update(userId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  remove(@Param('userId') userId: string){
    return this.userService.remove(userId);
  }


}
