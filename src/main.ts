import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //si solo se tiene esta propiedad filtra los datos que no pertenecen al dto
    transform: true, //tranforma lo recibido a una instancia que necesito, (ejemplo: findOne() [coffees controller])
    forbidNonWhitelisted: true, //si se tiene esta propiedad retorna un error mencionando los atributos extra,
    transformOptions: {
      enableImplicitConversion:true
    }
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
