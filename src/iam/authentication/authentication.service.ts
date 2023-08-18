import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const data = {
        login: signUpDto.login,
        password: await this.hashingService.hash(signUpDto.password),
        version: 1,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      };
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return { id: user.id };
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async loginIn(logInDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ login: logInDto.login });
    if (!user) {
      throw new ForbiddenException('No such user or password');
    }
    const isEqual = await this.hashingService.compare(
      logInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new ForbiddenException('No such user or password');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
