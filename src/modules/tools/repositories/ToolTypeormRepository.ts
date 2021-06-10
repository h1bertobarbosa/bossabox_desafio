import { getRepository, Raw, Repository } from 'typeorm';
import ToolRepository from '@src/modules/tools/contracts/ToolRepository';
import CreateToolData from '@src/modules/tools/contracts/CreateToolData';
import ListToolData from '@src/modules/tools/contracts/ListToolData';
import Tool from '@src/modules/tools/entities/Tool';

export default class ToolTypeormRepository implements ToolRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  async findById(id: string): Promise<Tool | undefined> {
    return this.ormRepository.findOne(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async create(data: CreateToolData): Promise<Tool> {
    const tool = this.ormRepository.create(data);

    return this.ormRepository.save(tool);
  }

  async list({ user_id, tag }: ListToolData): Promise<Tool[] | undefined> {
    const builder = this.ormRepository.createQueryBuilder('tools');
    builder.where('tools.user_id = :userId', { userId: user_id });

    if (tag) {
      builder.andWhere('tools.tags LIKE :tag', { tag: `%${tag}%` });
    }

    return builder.getMany();
  }
}
