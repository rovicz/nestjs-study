import { Controller, Get } from "@nestjs/common";

@Controller("concepts")
export class ConceptsController {
  @Get()
  home(): any {
    return "hello concepts!";
  }
}
