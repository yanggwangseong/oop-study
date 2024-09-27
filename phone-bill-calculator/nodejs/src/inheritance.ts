class Call {
  private from: Date;
  private to: Date;
  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  public get Duration(): number {
    return (this.to.getTime() - this.from.getTime()) / 1000;
  }

  public get From(): Date {
    return this.from;
  }
}

abstract class Phone {
  private calls: Call[] = [];

  protected afterCalculated(fee: Money): Money {
    return fee;
  }

  public calculateFee(): Money {
    let result = Money.ZERO;

    for (const call of this.calls) {
      result = result.plus(this.calculateCallFee(call));
    }

    return result;
  }

  protected abstract calculateCallFee(call: Call): Money;
}

class RegularPhone extends Phone {
  private amount: Money;
  private seconds: number;

  constructor(amount: Money, seconds: number) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  protected override calculateCallFee(call: Call): Money {
    return this.amount.times(call.Duration / this.seconds);
  }
}

class NightlyDiscountPhone extends Phone {
  private static LATE_NIGHT_HOUR: number = 22;

  private nightlyAmount: Money;
  private regularAmount: Money;
  private seconds: number;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number) {
    super();
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  protected override calculateCallFee(call: Call): Money {
    if (call.From.getHours() >= NightlyDiscountPhone.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.Duration / this.seconds);
    }
    return this.regularAmount.times(call.Duration / this.seconds);
  }
}

class Money {
  static readonly ZERO = Money.wons(0);

  constructor(private _amount: number) {}

  static wons(amount: number) {
    return new Money(amount);
  }

  public plus(money: Money): Money {
    return new Money(this._amount + money._amount);
  }

  public minus(money: Money): Money {
    return new Money(this._amount - money._amount);
  }

  public times(percent: number): Money {
    return new Money(this._amount * percent);
  }

  public get Amount(): number {
    return this._amount;
  }
}

class TaxableRegularPhone extends RegularPhone {
  private taxRate: number;

  constructor(amount: Money, seconds: number, taxRate: number) {
    super(amount, seconds);
    this.taxRate = taxRate;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class TaxableNightlyDiscountPhone extends NightlyDiscountPhone {
  private taxRate: number;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: number,
    taxRate: number
  ) {
    super(nightlyAmount, regularAmount, seconds);
    this.taxRate = taxRate;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class RateDiscountableRegularPhone extends RegularPhone {
  private discountAmount: Money;

  constructor(amount: Money, seconds: number, discountAmount: Money) {
    super(amount, seconds);
    this.discountAmount = discountAmount;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

class RateDiscountableNightlyDiscountPhone extends NightlyDiscountPhone {
  private discountAmount: Money;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: number,
    discountAmount: Money
  ) {
    super(nightlyAmount, regularAmount, seconds);
    this.discountAmount = discountAmount;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

/**
 * 일반 요금제의 계산 결과에 세금 정책을 조합한 후 기본 요금 할인 정책을 추가
 */
class TaableAndRateDiscountableRegularPhone extends TaxableRegularPhone {
  private discountAmount: Money;

  constructor(
    amount: Money,
    seconds: number,
    taxRate: number,
    discountAmount: Money
  ) {
    super(amount, seconds, taxRate);
    this.discountAmount = discountAmount;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

/**
 * 표준 요금제에 기본 요금 할인 정책을 먼저 적용한 후 세금을 나중에 부과
 */
class RateDiscountableAndTaxableRegularPhone extends RateDiscountableRegularPhone {
  private taxRate: number;

  constructor(
    amount: Money,
    seconds: number,
    discountAmount: Money,
    taxRate: number
  ) {
    super(amount, seconds, discountAmount);
    this.taxRate = taxRate;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

/**
 *심야 할인 요금제의 계산 결과에 세금 정책을 적용한 후 기본 요금 할인 정책을 적용
 */
class TaxableAndDiscountableNightlyDiscountPhone extends TaxableNightlyDiscountPhone {
  private discountAmount: Money;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: number,
    taxRate: number,
    discountAmount: Money
  ) {
    super(nightlyAmount, regularAmount, seconds, taxRate);
    this.discountAmount = discountAmount;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

/**
 * 심야 할인 요금제의 계산 결과에 기본 요금 할인 정책을 적용한 후 세금 정책을 적용
 */
class RateDiscountableAndTaxableNightlyDiscountPhone extends RateDiscountableNightlyDiscountPhone {
  private taxRate: number;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: number,
    discountAmount: Money,
    taxRate: number
  ) {
    super(nightlyAmount, regularAmount, seconds, discountAmount);
    this.taxRate = taxRate;
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}
