namespace Composition {
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

  /**
   * 기본 정책과 부과정책을 포괄하는 RatePolicy 인터페이스
   * RatePolict는 Phone을 인자로 받아 계산된 요금을 반환하는 calculateFee 오퍼레이션을 포함하는 인터페이스
   */
  interface RatePolicy {
    calculateFee(phone: Phone): Money;
  }

  /**
   * 기본 정책
   */
  abstract class BasicRatePolicy implements RatePolicy {
    public calculateFee(phone: Phone): Money {
      let result = Money.ZERO;

      for (const call of phone.Calls) {
        result = result.plus(this.calculateCallFee(call));
      }

      return result;
    }

    protected abstract calculateCallFee(call: Call): Money;
  }

  /**
   * 일반 요금제
   */
  class RegularPolicy extends BasicRatePolicy {
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

  /**
   * 심야 할인 요금제
   */
  class NightlyDiscountPolicy extends BasicRatePolicy {
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
      if (call.From.getHours() >= NightlyDiscountPolicy.LATE_NIGHT_HOUR) {
        return this.nightlyAmount.times(call.Duration / this.seconds);
      }
      return this.regularAmount.times(call.Duration / this.seconds);
    }
  }

  /**
   *  기본 정책을 이용해 요금을 계산 할 수 있게 Phone 수정
   */
  class Phone {
    private ratePolicy: RatePolicy;
    private calls: Call[] = [];

    constructor(ratePolicy: RatePolicy) {
      this.ratePolicy = ratePolicy;
    }

    public get Calls(): Call[] {
      return this.calls;
    }

    public calculateFee(): Money {
      return this.ratePolicy.calculateFee(this);
    }
  }

  /**
   * 부가 정책 추상 클래스
   */
  abstract class AdditionalRatePolicy implements RatePolicy {
    private next: RatePolicy;

    constructor(next: RatePolicy) {
      this.next = next;
    }

    public calculateFee(phone: Phone): Money {
      const fee = this.next.calculateFee(phone);
      return this.afterCalculated(fee);
    }

    protected abstract afterCalculated(fee: Money): Money;
  }

  /**
   * 세금 정책
   */
  class TaxablePolicy extends AdditionalRatePolicy {
    private taxRatio: number;

    constructor(taxRatio: number, next: RatePolicy) {
      super(next);
      this.taxRatio = taxRatio;
    }

    protected override afterCalculated(fee: Money): Money {
      return fee.plus(fee.times(this.taxRatio));
    }
  }

  /**
   * 새로운 기본 정책 추가
   * FixedRatePolicy
   */
  class FixedRatePolicy extends BasicRatePolicy {
    private amount: Money;

    constructor(amount: Money) {
      super();
      this.amount = amount;
    }

    protected override calculateCallFee(call: Call): Money {
      return this.amount;
    }
  }

  /**
   * 약정 할인 정책이라는 새로운 부가정책이 추가
   */
  class AgreementDiscountPolicy extends AdditionalRatePolicy {
    private discountAmount: Money;

    constructor(discountAmount: Money, next: RatePolicy) {
      super(next);
      this.discountAmount = discountAmount;
    }

    protected override afterCalculated(fee: Money): Money {
      return fee.minus(this.discountAmount);
    }
  }

  /**
   * 일반 요금제의 규칙에 따라 통화 요금 계산
   */
  const phone = new Phone(new RegularPolicy(Money.wons(5), 10));

  /**
   * 심야 할인 요금제의 규칙에 따라 통화 요금 계산
   */
  const phone2 = new Phone(
    new NightlyDiscountPolicy(Money.wons(5), Money.wons(3), 10)
  );

  /**
   * 새로 추가된 요금제
   */
  const phone3 = new Phone(new FixedRatePolicy(Money.wons(10)));

  /**
   * 일반 요금제와 약정 할인 부가정책 조합
   */
  const phone4 = new Phone(
    new AgreementDiscountPolicy(
      Money.wons(100),
      new RegularPolicy(Money.wons(5), 10)
    )
  );

  /**
   * 새로 추가된 요금제 + 할인 부가정책 조합
   */
  const phone5 = new Phone(
    new AgreementDiscountPolicy(
      Money.wons(100),
      new FixedRatePolicy(Money.wons(10))
    )
  );
}
