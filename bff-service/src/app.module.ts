import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ProductsModule, OrderModule, HttpModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
