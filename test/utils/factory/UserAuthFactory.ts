import { sign } from 'jsonwebtoken';
import { getConnection, EntityManager } from 'typeorm';
import faker from 'faker';
import User from '@src/modules/users/entities/User';
import authJWTConf from '@src/config/authJWT.config';

interface Attributes {
  email?: string;
  password?: string;
}

export default async (attr?: Attributes) => {
  const entityManager: EntityManager = getConnection().manager;
  const data = {
    email: attr?.email || faker.internet.email(),
    password: attr?.password || '123456',
  };

  const user = await entityManager.save(entityManager.create(User, data));

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = sign(payload, authJWTConf.secret, {
    subject: user.id,
    expiresIn: authJWTConf.expiresIn,
  });

  return { user, token };
};
