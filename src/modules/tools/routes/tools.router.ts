import { Router } from 'express';
import ToolsController from '@src/modules/tools/http/controllers/ToolsController';

const toolsController = new ToolsController();
const toolsRouter = Router();
toolsRouter.post('/', toolsController.store);
toolsRouter.delete('/:id', toolsController.destroy);
toolsRouter.get('/', toolsController.index);

export default toolsRouter;
