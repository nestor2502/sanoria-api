<<<<<<< HEAD
import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
=======
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
>>>>>>> master
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  
  constructor(private readonly recipeService: RecipeService){}
  
  @Public()
<<<<<<< HEAD
  @Get()
  geRecipe(@Query() nameQuery){
=======
  @Get("/search")
  geRecipes(@Query() nameQuery){
>>>>>>> master
    const {recipeName} = nameQuery;
    return this.recipeService.searchRecipes(recipeName)
  }

  @Public()
  @Get("/:recipeId")
  getRecipe(@Param('recipeId') recipeId: string){
    return this.recipeService.getRecipe(recipeId)
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
