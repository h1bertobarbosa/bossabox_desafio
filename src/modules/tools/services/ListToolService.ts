import ToolRepository from '@src/modules/tools/contracts/ToolRepository';
import Tool from '@src/modules/tools/entities/Tool';
import ListToolData from '@src/modules/tools/contracts/ListToolData';

export default class ListToolService {
  constructor(private toolRepository: ToolRepository) {}

  public async execute({
    user_id,
    tag,
  }: ListToolData): Promise<Tool[] | undefined> {
    return this.toolRepository.list({ user_id, tag });
  }
}
