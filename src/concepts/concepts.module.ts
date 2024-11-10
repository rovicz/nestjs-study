import { Module } from "@nestjs/common";
import { ConceptsController } from "./concepts.controller";
import { ConceptsService } from "./concepts.services";

@Module({
  imports: [],
  controllers: [ConceptsController],
  providers: [ConceptsService],
})
export class ConceptsModule {}
