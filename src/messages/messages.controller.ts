import { Controller } from "@nestjs/common";

@Controller("messages")
export class MessagesController {
  findAll() {
    return "Essa rota retorna todos os recados.";
  }

  findOne() {
    return "Essa rota retorna um recado.";
  }
}
