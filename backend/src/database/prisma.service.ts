import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

function resolveDatabaseConnectionString() {
  const value = process.env.DATABASE_URL;

  if (!value) {
    throw new Error('DATABASE_URL is not configured');
  }

  if (!value.startsWith('prisma+postgres://')) {
    return value;
  }

  const url = new URL(value);
  const apiKey = url.searchParams.get('api_key');

  if (!apiKey) {
    throw new Error('Prisma Postgres URL is missing api_key');
  }

  const payload = JSON.parse(Buffer.from(apiKey, 'base64url').toString('utf8')) as {
    databaseUrl?: string;
  };

  if (!payload.databaseUrl) {
    throw new Error('Prisma Postgres URL could not be resolved to a direct database URL');
  }

  return payload.databaseUrl;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const pool = new Pool({
      connectionString: resolveDatabaseConnectionString(),
    });
    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
