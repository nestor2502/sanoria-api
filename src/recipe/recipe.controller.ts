import { Controller, Get, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  
  constructor(private readonly RecipeService: RecipeService){}
  
  @Get()
  geRecipe(@Query() nameQuery){
    const {recipeName} = nameQuery;
    return this.RecipeService.getRecipe(recipeName)
  }
}
