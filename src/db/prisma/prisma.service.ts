import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService implements OnModuleInit {
//   public prismaClient: PrismaClient;

//   sayHello(message: string) {
//     console.log(`해위${message}`);
//   }

//   onModuleInit() {
//     console.log(`prismaService is initializing now`);
//     const prismaClient = new PrismaClient();
//     this.prismaClient = prismaClient;
//   }
// }

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  sayHello(message: string) {
    console.log(`해위${message}`);
  }
  async onModuleInit() {
    await this.$connect();
  }
}
