import { Controller, Get, Query} from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

    constructor(private readonly FoodService: FoodService){}

    @Get()
    getFood(@Query() nameQuery){
        const {foodName} = nameQuery;
        return this.FoodService.getRecipe(foodName)
      }
}
