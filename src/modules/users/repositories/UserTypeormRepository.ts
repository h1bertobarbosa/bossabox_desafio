import { getRepository, Repository } from 'typeorm';
import User from '@src/modules/users/entities/User';
import UserRepository from '@src/modules/users/contracts/UserRepository';
import CreateUserData from '@src/modules/users/contracts/CreateUserData';

export default class UserTypeormRepository implements UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ email });
  }

  public async create(data: CreateUserData): Promise<User> {
    const user = this.ormRepository.create(data);

    return this.ormRepository.save(user);
  }
}
