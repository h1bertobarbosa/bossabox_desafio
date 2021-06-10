import dotenv from 'dotenv';
const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path });

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  logging: false,
  database: process.env.NODE_ENV === 'test' ? 'bossabox_test' : 'bossabox',
  entities: [`${__dirname}/src/modules/**/entities/*.ts`],
  migrations: [`${__dirname}/src/database/migrations/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/src/modules/**/entities/*.ts`,
    migrationsDir: `${__dirname}/src/database/migrations`,
  },
};
