export class Money {
  static readonly ZERO = Money.wons(0);

  constructor(private _amount: number) {}

  static wons(amount: number) {
    return new Money(amount);
  }

  plus(money: Money): Money {
    return new Money(this._amount + money._amount);
  }

  minus(money: Money): Money {
    return new Money(this._amount - money._amount);
  }

  times(percent: number): Money {
    return new Money(this._amount * percent);
  }

  get Amount(): number {
    return this._amount;
  }
}
