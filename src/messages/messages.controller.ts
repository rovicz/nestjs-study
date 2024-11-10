import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessagesService } from "./messages.services";

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
}
