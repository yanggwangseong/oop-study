import { Injectable } from '@nestjs/common';
import { BasicRatePolicy } from '../../abstracts/basic-rate-policy.abstract';
import { Money } from '../../entities/money.entity';
import { Call } from '../../entities/call.entity';

@Injectable()
export class NightlyDiscountPolicyService extends BasicRatePolicy {
  private static readonly LATE_NIGHT_HOUR = 22;

  constructor(
    private nightlyAmount: Money,
    private regularAmount: Money,
    private seconds: number,
  ) {
    super();
  }

  protected override calculateCallFee(call: Call): Money {
    if (call.From.getHours() >= NightlyDiscountPolicyService.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.Duration / this.seconds);
    }

    return this.regularAmount.times(call.Duration / this.seconds);
  }
}
