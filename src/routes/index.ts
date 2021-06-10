import { Router } from 'express';
import registerRoutes from '@src/modules/users/routes/register.router';
import toolsRoutes from '@src/modules/tools/routes/tools.router';
import authRoutes from '@src/modules/users/routes/auth.router';
import ensureAuthenticated from '@src/http/middleware/ensureAuthenticated';

const routes = Router();

routes.use('/register', registerRoutes);
routes.use('/auth', authRoutes);
routes.use(ensureAuthenticated);
routes.use('/tools', toolsRoutes);

export default routes;
