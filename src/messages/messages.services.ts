import { Injectable } from "@nestjs/common";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      message: "Olá, meu nome é Victor!",
      de: "Victor",
      para: "Júlia",
      lido: false,
      data: new Date(),
    },
  ];

  findAll(): any {
    return this.messages;
  }

  findOne(id: string): any {
    return this.messages.filter((item) => item.id === +id);
  }

  findByQuery(query: any): any {
    const messageByQuery = this.messages.filter(
      (item) => item.id === +query.id,
    );

    return messageByQuery;
  }

  createMessage(body: any): any {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  updateMessage(id: string, body: any): any {
    const MessageIndex = this.messages.findIndex((item) => item.id === +id);

    if (MessageIndex >= 0) {
      const messageExistent = this.messages[MessageIndex];
      this.messages[MessageIndex] = {
        ...messageExistent,
        ...body,
      };

      return "Mensagem atualizada com sucesso!";
    }
  }

  deleteMessage(id: string): any {
    const MessageIndex = this.messages.findIndex((item) => item.id === +id);

    if (MessageIndex >= 0) {
      this.messages.splice(MessageIndex, 1);
      return "Mensagem Apagada com Sucesso.";
    }
  }
}
