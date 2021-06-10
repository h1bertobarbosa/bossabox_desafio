import AppErrorException from '@root/src/exceptions/AppErrorException';
import ToolRepository from '@src/modules/tools/contracts/ToolRepository';

interface DeleteToolData {
  tool_id: string;
  user_id: string;
}

export default class DeleteToolService {
  constructor(private toolRepository: ToolRepository) {}

  public async execute({ tool_id, user_id }: DeleteToolData): Promise<void> {
    const tool = await this.toolRepository.findById(tool_id);

    if (!tool) {
      throw new AppErrorException('Tool not found');
    }

    if (tool.user_id != user_id) {
      throw new AppErrorException('Tool not belongs for you');
    }

    await this.toolRepository.deleteById(tool_id);
  }
}
