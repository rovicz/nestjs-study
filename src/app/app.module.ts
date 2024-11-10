import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConceptsModule } from "src/concepts/concepts.module";
import { MessagesModule } from "src/messages/messages.module";

@Module({
  imports: [ConceptsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
