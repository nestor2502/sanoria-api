import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '../common/http/request'
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDetail } from './model/recipe-model';
import { RecipeResponse } from './model/recipe-response';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class RecipeService {

  private  http: HttpService;

  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private userService: UserService
  ){
    this.http = new HttpService();
  }

  async searchRecipes(search: string){
    if(!search || search === ""){
      throw new BadRequestException("Not search word")
    }
    let url = `https://api.edamam.com/api/recipes/v2?app_id=${process.env.APP_ID_RS}&app_key=${process.env.APP_KEY_RS}&type=public`;
    url += `&q=${search}`;
    const data = {
      method: "GET",
      url: url
    };
    try{
      let response = await this.http.makeCall(data)
      const res = JSON.parse(response+"");
      return this.wrapResponse(res);
    }
    catch(err){
      throw new ServiceUnavailableException("There is an error from our provider")
    }
  }

  async getRecipe(recipeId: string){
    return "this returns a recipe from edemam's api";
  }

  async create(recipe: CreateRecipeDto){
    const user = await this.userService.findOne(recipe.userId+"");
    if(!user){
      throw new NotFoundException(`User #${recipe.userId} not found`)
    }
    const newRecipe = this.recipeRepository.create({
      ...recipe
    });
    return this.recipeRepository.save(newRecipe);
  }

  async remove(recipeId: string){
    const recipe = await this.recipeRepository.findOne(recipeId);
    if(!recipe){
      throw new NotFoundException(`Recipe #${recipeId} not found`)
    }
   return this.recipeRepository.remove(recipe);
  }

  wrapResponse(data: RecipeResponse){
    
    let wrapper = {
      from: data.from? data.from: 0,
      to: data.to? data.to: 0,
      data: []
    }
    data.hits.forEach(recipeContainer => {
      const fullRecipe: RecipeDetail = recipeContainer.recipe;
      wrapper.data.push({
        label: fullRecipe.label? fullRecipe.label: "",
        image: fullRecipe.images? fullRecipe.images: [],
        dietLabels: fullRecipe.dietLabels? fullRecipe.dietLabels: [],
        healthLabels: fullRecipe.healthLabels?  fullRecipe.healthLabels: [],
        cautions: fullRecipe.cautions? fullRecipe.cautions: fullRecipe.cautions,
        ingredients: fullRecipe.ingredients? fullRecipe.ingredients: [],
        calories: fullRecipe.calories? fullRecipe.calories: 0,
        cuisineType: fullRecipe.cuisineType? fullRecipe.cuisineType: "",
        mealType: fullRecipe.mealType? fullRecipe.mealType: "",
        totalNutrients: fullRecipe.totalNutrients? fullRecipe.totalNutrients: [],
        uri: fullRecipe.uri? fullRecipe.uri: ""
      })
    })
    return wrapper;
  }

}
