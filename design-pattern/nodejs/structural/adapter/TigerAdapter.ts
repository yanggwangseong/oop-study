import { Animal } from "./Animal";
import { Tiger } from "./Tiger";

export class TigerAdapter extends Animal {
  private tiger: Tiger;

  constructor(name: string) {
    super(name);
    this.tiger = new Tiger();
    this.tiger.name = name;
  }

  override sound(): void {
    console.log(`${this.name} ${this.tiger.roar()}`);
  }
}
