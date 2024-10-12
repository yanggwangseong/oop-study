import { Injectable } from '@nestjs/common';
import { BasicRatePolicy } from '../../abstracts/basic-rate-policy.abstract';
import { Money } from '../../entities/money.entity';
import { Call } from '../../entities/call.entity';

@Injectable()
export class RegularPolicyService extends BasicRatePolicy {
  constructor(
    private amount: Money,
    private seconds: number,
  ) {
    super();
  }

  protected calculateCallFee(call: Call): Money {
    return this.amount.times(call.Duration / this.seconds);
  }
}
