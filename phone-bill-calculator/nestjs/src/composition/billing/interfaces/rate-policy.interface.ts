import { Phone } from '../entities/Phone.entity';
import { Money } from '../entities/money.entity';

export interface RatePolicy {
  calculateFee(phone: Phone): Money;
}
