import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  
  constructor(private readonly RecipeService: RecipeService){}
  
  @Public()
  @Get()
  geRecipe(@Query() nameQuery){
    const {recipeName} = nameQuery;
    return this.RecipeService.getRecipe(recipeName)
  }
}
