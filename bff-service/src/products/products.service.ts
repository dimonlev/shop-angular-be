import { Injectable} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';

const { PRODUCTS_URL } = process.env

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService,) {
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    console.log('PRODUCTS_URL: ', PRODUCTS_URL)

    try {
      const { data } = await this.httpService.axiosRef.get(
          `${PRODUCTS_URL}/productsPG`,
      );
      return data
    } catch (err) {
      console.error(err);
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
