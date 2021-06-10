import Tool from '@src/modules/tools/entities/Tool';
import CreateToolData from '@src/modules/tools/contracts/CreateToolData';
import ListToolData from '@src/modules/tools/contracts/ListToolData';

export default interface ToolRepository {
  create(data: CreateToolData): Promise<Tool>;
  list(data: ListToolData): Promise<Tool[] | undefined>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Tool | undefined>;
}
