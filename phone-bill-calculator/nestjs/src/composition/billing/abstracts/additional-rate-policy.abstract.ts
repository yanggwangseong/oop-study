import { Money } from '../entities/money.entity';
import { Phone } from '../entities/Phone.entity';
import { RatePolicy } from '../interfaces/rate-policy.interface';

export abstract class AdditionalRatePolicy implements RatePolicy {
  constructor(private next: RatePolicy) {}

  calculateFee(phone: Phone): Money {
    const fee = this.next.calculateFee(phone);
    return this.afterCalculated(fee);
  }

  protected abstract afterCalculated(fee: Money): Money;
}
