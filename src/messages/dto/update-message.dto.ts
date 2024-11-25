import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMessageDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
