import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  // mais de um recado pode ser enviado POR uma ÚNICA pessoa.
  @ManyToOne(() => Pessoa, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "de" })
  de: Pessoa;

  // mais de um recado pode ser enviado PARA uma ÚNICA pessoa.
  @ManyToOne(() => Pessoa, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "para" })
  para: Pessoa;

  @Column({ default: false })
  lido: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
