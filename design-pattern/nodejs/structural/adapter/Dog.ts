import { Animal } from "./Animal";

export class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  override sound(): void {
    console.log(`${this.name}`);
  }
}
