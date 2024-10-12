import { Test, TestingModule } from '@nestjs/testing';
import { RegularPolicyService } from './regular-policy.service';

describe('RegularPolicyService', () => {
  let service: RegularPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularPolicyService],
    }).compile();

    service = module.get<RegularPolicyService>(RegularPolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
