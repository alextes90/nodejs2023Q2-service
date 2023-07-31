import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { userDB } from 'db';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

export const returnUserFunc = (newUser: User) => {
  return {
    id: newUser.id,
    login: newUser.login,
    version: newUser.version,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
};

@Injectable()
export class UsersService {
  private users: User[] = userDB;

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return 'no user';
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const returnUser = returnUserFunc(newUser);
    this.users.push(newUser);
    return returnUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      if (this.users[userIndex].password !== updateUserDto.oldPassword) {
        return 'wrong passport';
      }
      this.users[userIndex].updatedAt = Date.now();
      this.users[userIndex].version += 1;
      this.users[userIndex].password = updateUserDto.newPassword;
      const returnUser = returnUserFunc(this.users[userIndex]);
      return returnUser;
    }
    return 'no user';
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    } else return 'no user';
  }
}
