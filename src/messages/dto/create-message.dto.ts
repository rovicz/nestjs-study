import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
