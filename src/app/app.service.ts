import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getActualDate(): any {
    const date: Date = new Date();
    return `actualDate: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
