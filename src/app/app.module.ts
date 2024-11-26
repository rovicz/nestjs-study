import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConceptsModule } from "src/concepts/concepts.module";
import { MessagesModule } from "src/messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      database: "postgres",
      password: "9999",
      autoLoadEntities: true, // carrega entidades sem precisar especifica-las.
      synchronize: true, // sincroniza com o banco de dados - evitar ser utilizado em produção.
    }),
    ConceptsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
