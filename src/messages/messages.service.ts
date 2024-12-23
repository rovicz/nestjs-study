import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Message } from "./entities/message.entity";
import { UpdateMessageDTO } from "./dto/update-message.dto";
import { CreateMessageDTO } from "./dto/create-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PessoasService } from "src/pessoas/pessoas.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly pessoasService: PessoasService,
  ) {}

  findAll() {
    return this.messagesRepository.find({
      relations: ["de", "para"],
      order: {
        id: "desc",
      },
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
      relations: ["de", "para"],
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
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
    if (!body.message || !body.deId || !body.paraId) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const { deId, paraId } = body;

    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const newMessage = {
      message: body.message,
      de: de,
      para: para,
      lido: false,
      data: new Date(),
    };

    const messageCreated = await this.messagesRepository.create(newMessage);
    await this.messagesRepository.save(messageCreated);

    return {
      ...messageCreated,
      de: {
        id: messageCreated.de.id,
      },
      para: {
        id: messageCreated.para.id,
      },
    };
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
