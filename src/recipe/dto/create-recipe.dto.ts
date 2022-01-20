import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateRecipeDto {
  
  @IsNumber()
  readonly userId: number;
  
  @IsString()
  readonly label: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly recipeId: string;
 
}