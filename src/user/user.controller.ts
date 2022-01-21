import { Controller, Get, Headers, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateAcheDto } from './dto/create-ache.dto';

@Controller('user')
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    ){
  }

  @Public()
  @Post()
  create(@Body() user: CreateUserDto){
    return this.userService.create(user);
  }

  @Public()
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

  @Public()
  @Get('/weight-log/:userId')
  findWeightRegister(@Param('userId') userId: string){
    return this.userService.findWeightRegister(userId);
  }

  @Public()
  @Get('/height-log/:userId')
  findHeightRegister(@Param('userId') userId: string){
    return this.userService.findHeightRegister(userId);
  }

  @Public()
  @Get('/:userId/ache')
  findAcheRegister(@Param('userId') userId: string){
    return this.userService.findAcheRegister(userId);
  }

  @Public()
  @Post('/:userId/ache')
  createAche(@Param('userId') userId: number, @Body() ache: CreateAcheDto){
    return this.userService.createAche(ache, userId);
  }



}
