import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePessoaDto } from "./dto/create-pessoa.dto";
import { UpdatePessoaDto } from "./dto/update-pessoa.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Pessoa } from "./entities/pessoa.entity";
import { Repository } from "typeorm";

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) {}

  async create(body: CreatePessoaDto) {
    if (!body.email || !body.name || !body.password) {
      throw new HttpException(
        "Não foi possível criar a mensagem, o envio dos dados não foram corretos.",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    try {
      const dadosPessoa = {
        name: body.name,
        passwordHash: body.password,
        email: body.email,
      };

      const novaPessoa = this.pessoasRepository.create(dadosPessoa);
      await this.pessoasRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === "23505") {
        return "Esse e-mail já foi cadastrado!";
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return updatePessoaDto;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
