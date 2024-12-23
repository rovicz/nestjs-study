import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove qualquer inject não requerido dentro do DTO.
      forbidNonWhitelisted: true, // demostra o erro quando a chave não existir.
      transform: false, // transforma os tipos dos dados de parametros/querys/dtos.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
