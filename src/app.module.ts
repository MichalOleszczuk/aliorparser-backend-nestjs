import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '../config/auth.config';
import { serverConfiguration } from '../config/server.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EnvUtilsService } from './modules/utils/env-utils/env-utils.service';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: EnvUtilsService.envDirPath({ customPath: 'env' }),
      load: [authConfig, serverConfiguration],
    }),
    UtilsModule,
    UsersModule,
  ],
})
export class AppModule {}
