import { Request, Response } from 'express';
import CreateUserService from '@src/modules/users/services/CreateUserService';
import UserTypeormRepository from '@src/modules/users/repositories/UserTypeormRepository';
import { CREATED } from '@src/utils/HttpStatusCode.utils';

export default class RegisterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService(
      new UserTypeormRepository(),
    );
    const { email, password } = request.body;
    const user = await createUserService.execute({ email, password });

    return response
      .status(CREATED)
      .json({ code: 'account.create.success', data: user });
  }
}
