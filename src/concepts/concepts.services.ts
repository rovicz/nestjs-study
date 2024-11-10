import { Injectable } from "@nestjs/common";

@Injectable()
export class ConceptsService {
  getHello(): string {
    return "Hello, Concepts!";
  }

  getCalcPlus(n1: number, n2: number): number {
    return n1 + n2;
  }
}
