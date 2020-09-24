import { Module } from '@nestjs/common';
import { EnvUtilsService } from './env-utils/env-utils.service';

@Module({
  providers: [EnvUtilsService]
})
export class UtilsModule {}
