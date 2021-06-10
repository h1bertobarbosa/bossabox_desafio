import CreateUserData from '@src/modules/users/contracts/CreateUserData';
import UserRepository from '@src/modules/users/contracts/UserRepository';
import User from '@src/modules/users/entities/User';

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute(data: CreateUserData): Promise<User> {
    return this.userRepository.create(data);
  }
}
