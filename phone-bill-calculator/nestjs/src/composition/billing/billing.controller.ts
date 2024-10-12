import { Controller, Get, Inject } from '@nestjs/common';
import { RatePolicy } from './interfaces/rate-policy.interface';
import { Phone } from './entities/Phone.entity';
import { Call } from './entities/call.entity';

@Controller('composition/billing')
export class BillingController {
  constructor(
    @Inject('REGULAR_POLICY') private readonly regularPolicy: RatePolicy,
  ) {}
  @Get('regular-calculate')
  calculateFee(): string {
    const phone = new Phone(this.regularPolicy);

    phone.Calls.push(
      new Call(
        new Date(2018, 0, 1, 12, 10, 0),
        new Date(2018, 0, 1, 12, 11, 0),
      ),
    );
    phone.Calls.push(
      new Call(
        new Date(2018, 1, 2, 12, 10, 0),
        new Date(2018, 1, 2, 12, 11, 0),
      ),
    );

    const fee = phone.calculateFee();
    return `총 요금은 ${fee.Amount}원 입니다.`;
  }
}
