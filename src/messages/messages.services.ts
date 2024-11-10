import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagesService {
  findAll(): string {
    return "Essa rota retorna todas as mensagens.";
  }

  findOne(id: string): string {
    if (id === "1") return "Mensagem 1: Parabéns, você acessou a rota.";
    if (id === "2") return "Mensagem 2: Você ta explorando bem, em!";
  }

  createMessage(id: string): string {
    return `Mensagem criada com sucesso (id: ${id})`;
  }
}
