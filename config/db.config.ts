import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type MutableRequired<T> = { -readonly [P in keyof T]: T[P] };
export type DbConfigPostgres = MutableRequired<PostgresConnectionOptions>;

export const dbPrefix = 'DB_';

export const bcryptSaltRounds = 10;

export const dbConfig = registerAs<() => DbConfigPostgres>(
  'dbConfig',
  () => {
    let config: DbConfigPostgres = {
      type: 'postgres' as DbConfigPostgres['type'],
    };

    const dbEntries = Object.entries(process.env).filter(([envKey]) =>
      envKey.startsWith(dbPrefix),
    );

    config = dbEntries.reduce(function(map, [envKey, envVar]) {
      const mapKey = envKey.split(dbPrefix)[1].toLowerCase();

      if (mapKey === 'entities') {
        const entitiesPath = path.normalize(path.join(__dirname, '../src', envVar));
        map[mapKey] = [entitiesPath];
        return map;
      }

      map[mapKey] = envVar;
      return map;
    }, config);

    return config;
  },
);
