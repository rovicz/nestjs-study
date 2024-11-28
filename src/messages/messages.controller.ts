import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDTO } from "./dto/create-message.dto";
import { UpdateMessageDTO } from "./dto/update-message.dto";

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get("/query")
  findByQuery(@Query() query: object) {
    return this.messagesService.findByQuery(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Post("create")
  createMessage(@Body() body: CreateMessageDTO): any {
    return this.messagesService.createMessage(body);
  }

  @Patch("update")
  updateMessage(@Body() body: UpdateMessageDTO): any {
    return this.messagesService.updateMessage(body);
  }

  @Delete("delete/:id")
  deleteMessage(@Param("id", ParseIntPipe) id: number): any {
    return this.messagesService.deleteMessage(id);
  }
}
