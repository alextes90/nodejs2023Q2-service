import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.userService.findOne(id);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.userService.update(id, updateUserDto);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    if (result === 'wrong passport') {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.userService.remove(id);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
