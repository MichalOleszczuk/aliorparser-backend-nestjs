import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbPrefix = 'DB_';

export const dbConfig = registerAs<() => PostgresConnectionOptions>(
  'dbConfig',
  () => {
    let config: PostgresConnectionOptions = {
      type: 'postgres' as PostgresConnectionOptions['type'],
    };

    const dbEntries = Object.entries(process.env).filter(([envKey]) =>
      envKey.startsWith(dbPrefix),
    );

    config = dbEntries.reduce(function(map, [envKey, envVar]) {
      const mapedKey = envKey.split(dbPrefix)[1].toLowerCase();

      map[mapedKey] = envVar;
      return map;
    }, config);

    return config;
  },
);
