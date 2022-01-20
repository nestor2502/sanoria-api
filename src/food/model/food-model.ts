import { Nutrients } from "./nutrients-model";

export class FoodDetail{

    readonly foodId: number;

    readonly label: string;

    readonly image: string;

    readonly nutrients: Nutrients;
}