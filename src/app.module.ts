import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { serverConfiguration } from '../config/serverConfiguration';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [
        '../env/.env',
        '../env/.env.server',
        '../env/.env.development',
        '../env/.env.development.local',
      ],
      load: [serverConfiguration],
    }),
  ],
})
export class AppModule {}
