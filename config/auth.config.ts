import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('authConfig', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
