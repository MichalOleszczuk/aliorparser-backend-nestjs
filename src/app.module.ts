import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { serverConfiguration } from '../config/serverConfiguration';
import { AuthModule } from './modules/auth/auth.module';
import { EnvUtilsService } from './modules/utils/env-utils/env-utils.service';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: EnvUtilsService.envDirPath({ customPath: 'env' }),
      load: [serverConfiguration],
    }),
    UtilsModule,
  ],
  providers: [EnvUtilsService],
})
export class AppModule {}
