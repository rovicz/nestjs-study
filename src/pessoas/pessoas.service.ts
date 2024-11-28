import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
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
        throw new ConflictException("E-mail já cadastrado!");
      }
    }
  }

  async findOne(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id });

    if (pessoa) {
      return pessoa;
    } else {
      throw new HttpException("Mensagem não encontrada.", HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dataPessoa = {
      name: updatePessoaDto?.name,
      passwordHash: updatePessoaDto?.password,
    };

    const pessoa = await this.pessoasRepository.preload({ id, ...dataPessoa });

    if (!pessoa) {
      throw new HttpException("Pessoa não encontrada.", HttpStatus.NOT_FOUND);
    }

    return this.pessoasRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id });

    if (pessoa) {
      this.pessoasRepository.remove(pessoa);
      return "Pessoa apagada com sucesso.";
    } else {
      throw new HttpException("Pessoa não encontrada.", HttpStatus.NOT_FOUND);
    }
  }
}
