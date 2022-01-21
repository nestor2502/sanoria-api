import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  
  constructor(private readonly recipeService: RecipeService){}
  
  /**
   * Get recipes from edemam api
   * @param nameQuery 
   * @returns 
   */
  @Public()
  @Get("/search")
  geRecipes(@Query() nameQuery){
    const queryRequest = nameQuery;
    return this.recipeService.searchRecipes(nameQuery)
  }

  /**
   * Get a specific recipe from edemam
   * @param recipeUri recipe uri
   * @returns 
   */
  @Public()
  @Get("/:recipeUri")
  getRecipe(@Param('recipeUri') recipeUri: string){
    return this.recipeService.getRecipe(recipeUri)
  }
  
  /**
   * Add a recipe to user schea
   * @param recipe 
   * @returns 
   */
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

  /**
   * Add a recipe to user schea
   * @param recipe 
   * @returns 
   */
   @Public()
   @Get('/schema/:userID')
   getSchema(@Param('userID') userID: string){
     return this.recipeService.findSchema(userID);
   }

}
