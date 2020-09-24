import { registerAs } from '@nestjs/config';

export const serverConfiguration = registerAs('serverConfiguration', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
}));
