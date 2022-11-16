import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  }),],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
