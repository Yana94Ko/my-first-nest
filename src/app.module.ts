import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlaBlaService } from './blabla.service';
import { AccountsModule } from './contexts/accounts/accounts.module';
import { OrdersModule } from './contexts/orders/orders.module';
import { ProductsModule } from './contexts/products/products.module';
import { CartsModule } from './contexts/carts/carts.module';
import { PrismaModule } from './db/prisma/prisma.module';

//응축되는곳
@Module({
  imports: [AccountsModule, ProductsModule, OrdersModule, CartsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, BlaBlaService],
})
export class AppModule {}
