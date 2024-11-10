import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Método de Navegação de GET (Requerir/Solicitar Informações);
  getHello(): any {
    return this.appService.getHello();
  }

  @Get("/date")
  getActualDate(): any {
    return this.appService.getActualDate();
  }

  @Get("/girlfriend")
  getVictorGirfrield(): any {
    return "Júlia Batista Santos";
  }
}
