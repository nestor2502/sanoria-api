import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '../common/http/request'

@Injectable()
export class FoodService {

    private  http: HttpService;

    constructor(){
      this.http = new HttpService();
    }

    async getRecipe(search: string){
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
    
      wrapResponse(data: FoodResponse){
    
        let wrapper = {
          from: data.from? data.from: 0,
          to: data.to? data.to: 0,
          data: []
        }
        data.hits.forEach(recipeContainer => {
          const fullRecipe: Recipe = recipeContainer.recipe;
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
            totalNutrients: fullRecipe.totalNutrients? fullRecipe.totalNutrients: []
          })
        })
        return wrapper;
      }
}
