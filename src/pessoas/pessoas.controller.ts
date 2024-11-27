import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from "@nestjs/common";
import { PessoasService } from "./pessoas.service";
import { CreatePessoaDto } from "./dto/create-pessoa.dto";
import { UpdatePessoaDto } from "./dto/update-pessoa.dto";

@Controller("pessoas")
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post("create")
  create(@Body() body: CreatePessoaDto): any {
    return this.pessoasService.create(body);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.pessoasService.findOne(id);
  }

  @Patch("update")
  update(@Param("id") id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.pessoasService.remove(+id);
  }
}
