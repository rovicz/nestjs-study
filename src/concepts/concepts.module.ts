import { Module } from "@nestjs/common";
import { ConceptsController } from "./concepts.controller";

@Module({
  imports: [],
  controllers: [ConceptsController],
  providers: [],
})
export class ConceptsModule {}
