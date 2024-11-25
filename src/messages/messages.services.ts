import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Message } from "./entities/message.entity";
import { UpdateMessageDTO } from "./dto/update-message.dto";
import { CreateMessageDTO } from "./dto/create-message.dto";

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

  findOne(id: number): any {
    const message = this.messages.find((item) => item.id === id);

    if (message) {
      return message;
    } else {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
      //throw new NotFoundException("Mensagem não encontrada!"); // Alternativa de return de Erro.
    }
  }

  findByQuery(query: any): any {
    const messageByQuery = this.messages.find((item) => item.id === query.id);

    if (messageByQuery) {
      return messageByQuery;
    } else {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }
  }

  createMessage(body: CreateMessageDTO): any {
    this.lastId++;
    const id = this.lastId;

    if (!body.de || !body.para || !body.message) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const newMessage = {
      id,
      ...body,
      lido: false,
      data: new Date(),
    };

    this.messages.push(newMessage);
    return newMessage;
  }

  updateMessage(body: UpdateMessageDTO): any {
    const MessageIndex = this.messages.findIndex(
      (item) => item.id === +body.id,
    );

    if (!body.id || !body.message) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (MessageIndex >= 0) {
      const messageExistent = this.messages[MessageIndex];

      this.messages[MessageIndex] = {
        ...messageExistent,
        ...body,
      };

      return "Mensagem atualizada com sucesso!";
    }

    if (MessageIndex < 0) {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }
  }

  deleteMessage(id: number): any {
    const MessageIndex = this.messages.findIndex((item) => item.id === +id);

    if (MessageIndex >= 0) {
      this.messages.splice(MessageIndex, 1);
      return "Mensagem apagada com sucesso.";
    }

    if (MessageIndex < 0) {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }
  }
}
