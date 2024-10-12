import { Module } from '@nestjs/common';
import { RegularPolicyService } from './rate-policies/regular-policy/regular-policy.service';
import { BillingController } from './billing.controller';
import { Money } from './entities/money.entity';
import { NightlyDiscountPolicyService } from './rate-policies/nightly-discount-policy/nightly-discount-policy.service';

@Module({
  controllers: [BillingController],
  providers: [
    /**
     * 일반 요금제의 규칙에 따라 통화 요금 계산
     */
    {
      provide: 'REGULAR_POLICY',
      useFactory: () => {
        return new RegularPolicyService(Money.wons(5), 10);
      },
    },
  ],
})
export class BillingModule {}
