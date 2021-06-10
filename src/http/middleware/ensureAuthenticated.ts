import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppErrorException from '@src/exceptions/AppErrorException';
import { UNAUTHORIZED } from '@src/utils/HttpStatusCode.utils';
import authJWTConf from '@src/config/authJWT.config';

interface TokenPayload {
  id: string;
  email: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppErrorException('JWT token is missing', UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authJWTConf.secret);

    request.user = decoded as TokenPayload;

    return next();
  } catch {
    throw new AppErrorException('Invalid JWT token', UNAUTHORIZED);
  }
}
