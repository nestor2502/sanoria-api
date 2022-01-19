import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  
  @IsString()
  readonly name: string;
  
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly gender: string;

  @IsNumber()
  readonly age: number;

  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly height: number;
  
  @IsString({each: true})
  readonly allergies: string[];




}