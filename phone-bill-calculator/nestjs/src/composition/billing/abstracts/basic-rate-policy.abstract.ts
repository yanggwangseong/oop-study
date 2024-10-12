import { Call } from '../entities/call.entity';
import { Money } from '../entities/money.entity';
import { Phone } from '../entities/Phone.entity';
import { RatePolicy } from '../interfaces/rate-policy.interface';

export abstract class BasicRatePolicy implements RatePolicy {
  calculateFee(phone: Phone): Money {
    let result = Money.ZERO;
    for (const call of phone.Calls) {
      result = result.plus(this.calculateCallFee(call));
    }

    return result;
  }

  protected abstract calculateCallFee(call: Call): Money;
}
