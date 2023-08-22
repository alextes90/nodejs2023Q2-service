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
import { RefreshTokenDto } from './dto/refresh-token.dto';
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
    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<User>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { login: user.login },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        { secret: this.jwtConfiguration.secret },
      );
      const user = await this.userRepository.findOneByOrFail({
        id: sub,
      });
      return this.generateTokens(user);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
