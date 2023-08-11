import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const returnUserFunc = (newUser: User) => {
  return {
    id: newUser.id,
    login: newUser.login,
    version: newUser.version,
    createdAt: new Date(Number(newUser.createdAt)).getTime(),
    updatedAt: new Date(Number(newUser.updatedAt)).getTime(),
  };
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const result = await this.userRepository.find();
    return result.map((el) => returnUserFunc(el));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return 'no user';
    }

    return returnUserFunc(user);
  }

  async create(createUserDto: CreateUserDto) {
    const data = {
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    const user = this.userRepository.create(data);
    const result = await this.userRepository.save(user);
    const returnUser = returnUserFunc(result);
    return returnUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      if (user.password !== updateUserDto.oldPassword) {
        return 'wrong passport';
      }
      user.updatedAt = Date.now().toString();
      user.version += 1;
      user.password = updateUserDto.newPassword;
      await this.userRepository.save(user);
      const returnUser = returnUserFunc(user);
      return returnUser;
    }
    return 'no user';
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return await this.userRepository.delete(id);
    } else return 'no user';
  }
}
