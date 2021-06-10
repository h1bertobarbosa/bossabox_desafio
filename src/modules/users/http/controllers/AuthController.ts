import { Request, Response } from 'express';
import { OK } from '@src/utils/HttpStatusCode.utils';
import AuthUserService from '@src/modules/users/services/AuthUserService';
import UserTypeormRepository from '@src/modules/users/repositories/UserTypeormRepository';

export default class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUserService = new AuthUserService(new UserTypeormRepository());
    const userAuth = await authUserService.execute(email, password);

    return response
      .status(OK)
      .json({ code: 'account.login.success', data: userAuth });
  }
}
