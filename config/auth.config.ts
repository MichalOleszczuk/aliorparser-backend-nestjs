import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('authConfig', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
