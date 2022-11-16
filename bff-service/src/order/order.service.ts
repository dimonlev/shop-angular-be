import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {HttpService} from "@nestjs/axios";

const { ORDER_URL } = process.env

@Injectable()
export class OrderService {
  constructor(private readonly httpService: HttpService,) {
  }
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    console.log('ORDER_URL: ', ORDER_URL)

    try {
      const { data } = await this.httpService.axiosRef.get(
          `${ORDER_URL}/api/profile/order`,
      );
      return data
    } catch (err) {
      console.error(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
