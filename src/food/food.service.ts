import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '../common/http/request'
import { FoodDetail } from './model/food-model';
import { FoodResponse } from './model/food-response';


@Injectable()
export class FoodService {

  private  http: HttpService;

  constructor(){
    this.http = new HttpService();
  }
  
  async getFood(ingr: string){
    if(!ingr || ingr === ""){
      throw new BadRequestException("Not search word")
    }
    let url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID_FD}&app_key=${process.env.APP_KEY_FD}`;
    url += `&ingr=${ingr}`;
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
      text: data.text? data.text: "",
      data: []
    }
    
    data.parsed.forEach(foodContainer => {
      const fullFood: FoodDetail = foodContainer.food;
      wrapper.data.push({
        foodId: fullFood.foodId? fullFood.foodId: 0,
        label: fullFood.label? fullFood.label: "",
        image: fullFood.image? fullFood.image: "",
        nutrients: fullFood.nutrients? fullFood.nutrients: null
      })
    })

    return wrapper;
  }
}
