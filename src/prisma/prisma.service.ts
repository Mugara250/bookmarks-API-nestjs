import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaPg({ connectionString });

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const connectionString = `${config.get('DATABASE_URL')}`;
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }
}
