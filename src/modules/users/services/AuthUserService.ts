import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppErrorException from '@root/src/exceptions/AppErrorException';
import UserRepository from '@src/modules/users/contracts/UserRepository';
import authJWTConf from '@src/config/authJWT.config';

interface ResponseToken {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export default class AuthUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute(
    email: string,
    password: string,
  ): Promise<ResponseToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppErrorException('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppErrorException('Email or password incorrect');
    }

    const tokenPayload = { id: user.id, email: user.email };
    const token = sign(tokenPayload, authJWTConf.secret, {
      subject: user.id,
      expiresIn: authJWTConf.expiresIn,
    });

    return { user: tokenPayload, token } as ResponseToken;
  }
}
