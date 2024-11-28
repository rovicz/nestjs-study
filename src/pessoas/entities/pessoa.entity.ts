import { IsEmail } from "class-validator";
import { Message } from "src/messages/entities/message.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // uma pessoa pode ter enviado muitos recados.
  @OneToMany(() => Message, (message) => message.de)
  messagesSent: Message[];

  //uma pessoa pode ter recebido muitos recados.
  @OneToMany(() => Message, (message) => message.para)
  messagesReceived: Message[];
}
