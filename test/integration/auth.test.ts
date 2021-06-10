// import { getConnection } from 'typeorm';
// import User from '@src/modules/user/entity/User';
import { CREATED } from '@src/utils/HttpStatusCode.utils';

describe('Auth Tests', () => {
  describe('POST /register - create a new user', () => {
    it('should create a new user', async () => {
      const data = {
        email: 'email@gmail.com',
        password: '123456',
      };

      const result = await global.testRequest
        .post('/register')
        .send(data)
        .expect(CREATED);

      expect(result.body.code).toEqual('account.create.success');
      expect(result.body.data).toHaveProperty('id');
    });
  });
});
