import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 5050;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`App is Running at "http://localhost:${port}"`);
  });
}
bootstrap();
