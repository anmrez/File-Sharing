import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  let PORT = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule);
  app.enableCors()


  await app.listen( PORT, function(){
    console.log( '[APP] server started on ' + PORT )
  });


}
bootstrap();
