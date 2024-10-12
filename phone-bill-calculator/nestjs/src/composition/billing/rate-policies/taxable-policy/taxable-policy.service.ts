import { Injectable } from '@nestjs/common';
import { AdditionalRatePolicy } from '../../abstracts/additional-rate-policy.abstract';
import { RatePolicy } from '../../interfaces/rate-policy.interface';
import { Money } from '../../entities/money.entity';

@Injectable()
export class TaxablePolicyService extends AdditionalRatePolicy {
  constructor(
    private taxRatio: number,
    next: RatePolicy,
  ) {
    super(next);
  }

  protected override afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRatio));
  }
}
