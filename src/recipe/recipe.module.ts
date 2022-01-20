import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Recipe]),
  ],
  providers: [RecipeService],
  controllers: [RecipeController]
})
export class RecipeModule {}
