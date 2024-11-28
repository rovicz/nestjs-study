import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
