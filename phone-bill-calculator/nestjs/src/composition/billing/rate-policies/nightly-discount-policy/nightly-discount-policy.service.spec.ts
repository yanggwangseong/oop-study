import { Test, TestingModule } from '@nestjs/testing';
import { NightlyDiscountPolicyService } from './nightly-discount-policy.service';

describe('NightlyDiscountPolicyService', () => {
  let service: NightlyDiscountPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NightlyDiscountPolicyService],
    }).compile();

    service = module.get<NightlyDiscountPolicyService>(
      NightlyDiscountPolicyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
