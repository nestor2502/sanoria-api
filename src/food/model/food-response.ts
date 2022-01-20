import { Food } from "./food-model";

export class FoodResponse {
  
  readonly text: number;

  readonly label: string;

  readonly parsed: Food[]

  readonly image: string;
}