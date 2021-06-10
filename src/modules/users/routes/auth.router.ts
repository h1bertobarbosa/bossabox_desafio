import { Router } from 'express';
import AuthController from '@src/modules/users/http/controllers/AuthController';
const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authController.create);

export default authRouter;
