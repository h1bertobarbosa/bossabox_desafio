import { Router } from 'express';
import RegisterController from '@src/modules/users/http/controllers/RegisterController';

const registerController = new RegisterController();
const registerRouter = Router();
registerRouter.post('/', registerController.create);

export default registerRouter;
