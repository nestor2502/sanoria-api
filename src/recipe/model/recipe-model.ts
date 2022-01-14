
export class Recipe{

  readonly label: string;

  readonly images: {
    REGULAR: {
      url:string
    }
  };
  
  readonly dietLabels: [string];

  readonly healthLabels: [string];

  readonly cautions: [string];

  readonly ingredients: [{

    name: string,
    food: string,
    foodCategory: string,
    foodId: string,
    image: string,

  }];

  readonly calories: number;

  readonly cuisineType: string;

  readonly mealType: string;

  readonly totalNutrients: [Object];
}