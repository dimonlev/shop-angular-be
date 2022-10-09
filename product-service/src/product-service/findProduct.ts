import { Product } from 'src/product-service/ProductType';

export const findProduct = (arr: Product[], id: string) =>
  arr.find((product) => product.id === id) ?? 'product not found';
