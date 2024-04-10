import { Test } from '@nestjs/testing';

import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  it('should be defined', async () => {
    const testingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    expect(testingModule.get(UserService)).toBeDefined();
  });
});
