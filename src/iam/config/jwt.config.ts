import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET_KEY,
    accessTokenTtl:
      parseInt(process.env.TOKEN_EXPIRE_TIME ?? '1', 10) * 60 * 60,
    refreshTokenTtl:
      parseInt(process.env.TOKEN_REFRESH_EXPIRE_TIME ?? '24', 10) * 60 * 60,
  };
});
