import { Controller, Get } from "@nestjs/common";
import { ConceptsService } from "./concepts.services";

@Controller("concepts")
export class ConceptsController {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Get()
  getHello(): string {
    return this.conceptsService.getHello();
  }

  //@Get()
  //getCalcPlus(":n1?:n2"): number {
  ///return this.conceptsService.getCalcPlus()
  // }
}
