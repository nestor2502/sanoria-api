import { Recipe } from "./recipe-model";

export class RecipeResponse {
  
  readonly from: number;

  readonly to: number;

  readonly hits: [{
    recipe: Recipe;
  }]

}