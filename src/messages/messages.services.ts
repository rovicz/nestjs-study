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

  createMessage(body: any): any {
    if (body.id && body.message) {
      return {
        ...body,
        status: 201,
      };
    } else {
      return {
        status: 404,
        message:
          "Erro ao criar a mensagem, necessário respeitar os paramêtros do body.",
      };
    }
  }

  updateMessage(id: string, body: any): any {
    if (id && body) {
      return {
        ...body,
        statusMesage: `Mensagem de ID ${id} atualizado com sucesso.`,
      };
    } else {
      return {
        status: 404,
        message:
          "Erro ao atualizar a mensagem, necessário respeitar os paramêtros do body.",
      };
    }
  }

  deleteMessage(id: string): any {
    return {
      id,
      statusMesage: `Mensagem de ID ${id} deletada com sucesso.`,
    };
  }
}
