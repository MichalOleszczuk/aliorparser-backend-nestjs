import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dbConfig = configService.get<PostgresConnectionOptions>('dbConfig');
      return dbConfig;
    },
    inject: [ConfigService],
  });
}

@Module({
  imports: [DatabaseOrmModule()],
})
export class DatabaseModule {}
