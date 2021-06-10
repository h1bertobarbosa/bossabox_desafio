import CreateToolData from '@src/modules/tools/contracts/CreateToolData';
import ToolRepository from '@src/modules/tools/contracts/ToolRepository';
import Tool from '@src/modules/tools/entities/Tool';

export default class CreateToolService {
  constructor(private toolRepository: ToolRepository) {}

  public async execute(data: CreateToolData): Promise<Tool> {
    return this.toolRepository.create(data);
  }
}
