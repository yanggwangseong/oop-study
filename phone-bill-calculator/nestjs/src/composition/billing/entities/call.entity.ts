export class Call {
  constructor(
    private from: Date,
    private to: Date,
  ) {}

  get Duration(): number {
    return (this.to.getTime() - this.from.getTime()) / 1000;
  }

  get From(): Date {
    return this.from;
  }
}
