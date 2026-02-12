import 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ adapter });
  }
}
