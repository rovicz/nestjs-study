import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Message } from "./entities/message.entity";
import { UpdateMessageDTO } from "./dto/update-message.dto";
import { CreateMessageDTO } from "./dto/create-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      message: "Olá, meu nome é Victor!",
      de: "Victor",
      para: "Júlia",
      lido: false,
      createdAt: new Date(),
    },
  ];

  findAll() {
    return this.messagesRepository.find();
  }

  async findOne(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
    });

    if (message) {
      return message;
    } else {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
      //throw new NotFoundException("Mensagem não encontrada!"); // Alternativa de return de Erro.
    }
  }

  async findByQuery(query: any) {
    const messageByQuery = await this.messagesRepository.findOne({
      where: {
        id: query.id,
      },
    });

    if (messageByQuery) {
      return messageByQuery;
    } else {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }
  }

  async createMessage(body: CreateMessageDTO) {
    if (!body.de || !body.para || !body.message) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const newMessage = {
      ...body,
      lido: false,
      data: new Date(),
    };

    const messageCreated = await this.messagesRepository.create(newMessage);

    return this.messagesRepository.save(messageCreated);
  }

  async updateMessage(body: UpdateMessageDTO) {
    if (!body.id || !body.message) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const message = await this.messagesRepository.preload({
      id: body.id,
      ...body,
    });

    if (!message) {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }

    if (message) return this.messagesRepository.save(message);
  }

  async deleteMessage(id: number) {
    const message = await this.messagesRepository.findOneBy({ id });

    if (!message) {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }

    if (message) {
      this.messagesRepository.remove(message);
      return "Mensagem apagada com sucesso.";
    }
  }
}
