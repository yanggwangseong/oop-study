import { Call } from './call.entity';
import { RatePolicy } from '../interfaces/rate-policy.interface';
import { Money } from './money.entity';

export class Phone {
  private calls: Call[] = [];

  constructor(private ratePolicy: RatePolicy) {}

  get Calls(): Call[] {
    return this.calls;
  }

  calculateFee(): Money {
    return this.ratePolicy.calculateFee(this);
  }
}
