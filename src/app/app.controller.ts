import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/date') // Método de Navegação de GET (Requerir/Solicitar Informações);
  getActualDate(): any {
    return this.appService.getActualDate();
  }
}
