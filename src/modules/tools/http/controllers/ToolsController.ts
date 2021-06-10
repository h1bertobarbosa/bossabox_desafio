import { Request, Response } from 'express';
import { CREATED, OK, NO_CONTENT } from '@src/utils/HttpStatusCode.utils';
import CreateToolService from '@src/modules/tools/services/CreateToolService';
import ToolTypeormRepository from '@src/modules/tools/repositories/ToolTypeormRepository';
import ListToolService from '@src/modules/tools/services/ListToolService';
import DeleteToolService from '../../services/DeleteToolService';

export default class ToolsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const createService = new CreateToolService(new ToolTypeormRepository());

    const { title, link, description, tags } = request.body;

    const tool = await createService.execute({
      title,
      link,
      description,
      tags,
      user_id: request.user.id,
    });

    return response
      .status(CREATED)
      .json({ code: 'tools.create.success', data: tool });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listService = new ListToolService(new ToolTypeormRepository());
    const { tag } = request.query;

    const tools = await listService.execute({
      user_id: request.user.id,
      tag: tag ? String(tag) : '',
    });

    return response
      .status(OK)
      .json({ code: 'tools.list.success', data: tools || [] });
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteService = new DeleteToolService(new ToolTypeormRepository());
    const { id: tool_id } = request.params;
    const { id: user_id } = request.user;

    await deleteService.execute({ tool_id, user_id });
    return response.sendStatus(NO_CONTENT);
  }
}
