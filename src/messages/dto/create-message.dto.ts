import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  readonly para: string;
}
