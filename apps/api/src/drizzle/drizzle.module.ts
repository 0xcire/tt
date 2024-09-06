import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { TT_DB } from 'src/common/symbols';
import { ENV } from 'src/common/enums';

@Module({
  providers: [
    {
      provide: TT_DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const TT_DB_USER = configService.get<string>(ENV.TT_DB_USER);
        const TT_DB_PASSWORD = configService.get<string>(ENV.TT_DB_PASSWORD);
        const TT_DB_NAME = configService.get<string>(ENV.TT_DB_NAME);
        const TT_DB_HOST = configService.get<string>(ENV.TT_DB_HOST);
        const TT_DB_PORT = +configService.get<string>(ENV.TT_DB_PORT);

        const pool = new Pool({
          user: TT_DB_USER,
          password: TT_DB_PASSWORD,
          database: TT_DB_NAME,
          host: TT_DB_HOST,
          port: TT_DB_PORT,
          ssl: true,
        });

        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [TT_DB],
})
export class DrizzleModule {}
