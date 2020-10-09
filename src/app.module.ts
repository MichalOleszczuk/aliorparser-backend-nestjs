import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '../config/auth.config';
import { dbConfig } from '../config/db.config';
import { serverConfiguration } from '../config/server.config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { EnvUtilsService } from './modules/utils/env-utils/env-utils.service';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UtilsModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: EnvUtilsService.envDirPath({ customPath: 'env' }),
      load: [authConfig, dbConfig, serverConfiguration],
    }),
  ],
})
export class AppModule {}
