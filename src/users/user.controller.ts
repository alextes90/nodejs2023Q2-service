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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ReturnUser } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({
    description: 'The user record',
    type: ReturnUser,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    description: 'The user record',
    type: ReturnUser,
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.userService.findOne(id);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @ApiCreatedResponse({
    description: 'The user record',
    type: ReturnUser,
  })
  @ApiBadRequestResponse({
    description: 'does not contained required body',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'The user record',
    type: ReturnUser,
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiForbiddenResponse({
    description: 'invalid old password',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.userService.update(id, updateUserDto);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    if (result === 'wrong passport') {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @ApiNoContentResponse({
    description: 'deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'id is not a valid uuid',
  })
  @ApiNotFoundResponse({
    description: 'no such id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `Id - is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.userService.remove(id);
    if (result === 'no user') {
      throw new HttpException(`Id - is not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
