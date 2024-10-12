import { Test, TestingModule } from '@nestjs/testing';
import { TaxablePolicyService } from './taxable-policy.service';

describe('TaxablePolicyService', () => {
  let service: TaxablePolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxablePolicyService],
    }).compile();

    service = module.get<TaxablePolicyService>(TaxablePolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
