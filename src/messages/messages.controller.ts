import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { MessagesService } from "./messages.services";

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

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @Post("create")
  createMessage(@Body() body: any): any {
    return this.messagesService.createMessage(body);
  }

  @Patch("update/:id")
  updateMessage(@Param("id") id: string, @Body() body: any): any {
    return this.messagesService.updateMessage(id, body);
  }

  @Delete("delete/:id")
  deleteMessage(@Param("id") id: string): any {
    return this.messagesService.deleteMessage(id);
  }
}
