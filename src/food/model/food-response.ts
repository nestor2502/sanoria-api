import { FoodDetail } from "./food-model";

export class FoodResponse {
  
  readonly text: string;

  readonly parsed: [{
    food: FoodDetail;
  }]

}