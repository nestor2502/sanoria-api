import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  
  constructor(private readonly recipeService: RecipeService){}
  
  @Public()
  @Get("/search")
  geRecipes(@Query() nameQuery){
    const {recipeName} = nameQuery;
    return this.recipeService.searchRecipes(recipeName)
  }

  @Public()
  @Get("/:recipeUri")
  getRecipe(@Param('recipeUri') recipeUri: string){
    return this.recipeService.getRecipe(recipeUri)
  }

  @Public()
  @Post()
  create(@Body() recipe: CreateRecipeDto){
    return this.recipeService.create(recipe);
  }

  @Public()
  @Delete("/:recipeId")
  delete(@Param('recipeId') recipeId: string){
    return this.recipeService.remove(recipeId);
  }

}
