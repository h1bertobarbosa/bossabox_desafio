import supertest from 'supertest';
import app from './src/main';
import { createConnection, Connection } from 'typeorm';
import User from './src/modules/users/entities/User';

let connection: Connection;
beforeAll(async () => {
  connection = await createConnection();
  global.testRequest = supertest(app);
});

afterAll(async () => {
  await connection
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
  await connection.close();
});
