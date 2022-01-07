import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database,
      ssl: {
        rejectUnauthorized: false,
      },
      host: 'ec2-34-230-133-163.compute-1.amazonaws.com', // database host
      port: 5432, // database host
      username: 'qysnuuyzryfxbj', // username
      password: 'bce473c23dbd5d59fa7d0e7b16ae143faa6dabe26b010c9a824885af9044c904', // user password
      database: 'd3gnus870fp695', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
