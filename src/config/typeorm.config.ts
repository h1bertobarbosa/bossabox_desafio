import { createConnection } from 'typeorm';
import '@src/config/env.config';

(async () => createConnection())();
