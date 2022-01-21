import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateAcheDto {
  
  @IsString()
  readonly ache: string;
  
}