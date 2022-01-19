import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Allergie } from './entities/user-allergy.entity';
import * as moment from 'moment';
import { Weight_Log } from './entities/user-weight.entity';
import { Height_Log } from './entities/user-height.entity';

@Injectable()
export class UserService {
  
  constructor( 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Allergie)
    private readonly allergieRepository: Repository<Allergie>,
    @InjectRepository(Weight_Log)
    private readonly weightRepository: Repository<Weight_Log>,
    @InjectRepository(Height_Log)
    private readonly heightRepository: Repository<Height_Log>,){
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
    const allergies = await Promise.all(
      user.allergies.map(name => this.preloadAllergieByName(name))
    );

    
    const newUser = this.userRepository.create({
      ...user,
      allergies,
    });
    const newAdded = await this.userRepository.save(newUser);
    const weight_log = await Promise.all(
      [user.weight].map(weight => this.preloadWeight(weight, newAdded.id))
    );
    const height_log = await Promise.all(
      [user.height].map(height => this.preloadHeight(height, newAdded.id))
    );
    await this.weightRepository.save(weight_log)
    await this.heightRepository.save(height_log)
    return {status: "ok"};
  }

  async findOne(userId: string){
    const user = await this.userRepository.findOne(userId, {
        relations: ['allergies']
      });
    if(!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
    const { password, ...result } = user;
    return result;
  }

  async update(userId: string, updateUserDto: UpdateUserDto){

    const allergies = updateUserDto.allergies && (await Promise.all(
      updateUserDto.allergies.map(name => this.preloadAllergieByName(name))
    ));
    
    const user = await this.userRepository.preload({
      id: +userId,
      ...updateUserDto,
      allergies,
    });
    if (!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
    await this.userRepository.save(user);

    if(updateUserDto.weight){
      const weight_log = await Promise.all(
        [updateUserDto.weight].map(weight => this.preloadWeight(weight, userId))
      );
      await this.weightRepository.save(weight_log)
    }
    if(updateUserDto.height){
      
      console.log("updateUserDto.height")
      console.log(updateUserDto.height)
      const height_log = await Promise.all(
        [updateUserDto.height].map(height => this.preloadHeight(height, userId))
      );
      console.log("height_log")
      console.log(height_log)
      await this.heightRepository.save(height_log)
    }
    return {status: "ok"};
  }

  async remove(userId: string){
    const user = await this.userRepository.findOne(userId);
    if(!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
   return this.userRepository.remove(user);
  }

  async login( updateUserDto){
    if(!updateUserDto.name){
      throw new BadRequestException("Invalid username")
    }
    const existsUser = await this.userRepository.find({
      where:[
        {
          name: Equal(`${updateUserDto.name}`)
        }
      ]}
    );
    if (!existsUser || existsUser.length == 0){
      throw new NotFoundException(`Username #${updateUserDto.name} not found`);
    }
    existsUser[0].token = updateUserDto.token;
    return this.userRepository.save(existsUser[0]);
  }


  async logout(userId: string){
    const user = await this.userRepository.preload({
      id: +userId,
      token: null,
    });
    if (!user){
      throw new NotFoundException(`User #${userId} not found`)
    }
    return this.userRepository.save(user);
  }

  private async preloadAllergieByName(name: string): Promise<Allergie> {
    return this.allergieRepository.create({ name });
  }

  private async preloadWeight(weight: number, userId): Promise<Weight_Log> {
    return this.weightRepository.create({ weight , userId, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
  }

  private async preloadHeight(height: number, userId): Promise<Height_Log> {
    return this.heightRepository.create({ height , userId, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
  }
  
}
