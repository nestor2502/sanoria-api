import { Controller, Get, Query} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

    constructor(private readonly FoodService: FoodService){}

    @Public()
    @Get()
    getFood(@Query() nameQuery){
      const {ingr} = nameQuery;
      return this.FoodService.getFood(ingr)
    }
}