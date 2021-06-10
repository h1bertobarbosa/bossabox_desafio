import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import '@src/config/env.config';
import '@src/config/typeorm.config';
import routes from '@src/routes';
import AppErrorException from '@src/exceptions/AppErrorException';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppErrorException) {
    return response.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: ${err.message}`,
  });
});

export default app;
