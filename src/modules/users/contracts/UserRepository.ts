import User from '@src/modules/users/entities/User';
import CreateUserData from '@src/modules/users/contracts/CreateUserData';

export default interface UserRepository {
  create(data: CreateUserData): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
