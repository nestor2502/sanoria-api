import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Equals } from 'class-validator';

@Injectable()
export class UserService {

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  
  constructor( 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){
  }
    
  async create(user: CreateUserDto){
    const existsUser = await this.userRepository.find({
      where:[
        {
          name: Equal(`${user.name}`)
        },
        {
          email: Equal(`${user.email}`)
        }
      ]}
    );
    if(existsUser.length > 0){
      throw new NotAcceptableException(`Username or email in use`)
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findOne(userId: string){
    const user = await this.userRepository.findOne(userId);
    if(!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.preload({
      id: +userId,
      ...updateUserDto,
    });
    if (!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string){
    const user = await this.userRepository.findOne(userId);
    if(!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
   return this.userRepository.remove(user);
  }
  
  async findOneByEmail(username) {
     const user = await this.userRepository.find({
      where:[
        {
          name: Equal(`${username}`)
        }
      ]}
    )
    if(!user){
      return null;
    }
    return user[0];
  }
  
  

}
