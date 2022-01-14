import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  providers: [RecipeService],
  controllers: [RecipeController]
})
export class RecipeModule {}
