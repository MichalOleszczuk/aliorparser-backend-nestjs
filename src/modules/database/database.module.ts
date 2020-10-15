import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigPostgres } from 'config/db.config';

function DatabaseOrmModuleFactory(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dbConfig = configService.get<DbConfigPostgres>('dbConfig');
      return dbConfig;
    },
    inject: [ConfigService],
  });
}

const DatabaseOrmModule = DatabaseOrmModuleFactory();

@Module({
  imports: [DatabaseOrmModule],
  exports: [DatabaseOrmModule],
})
export class DatabaseModule {}
