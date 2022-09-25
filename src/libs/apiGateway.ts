import { Product } from '@functions/ProductType';

export const formatJSONResponse = (
  product: Product | Product[],
  statusCode: number = 200
  // options: { message?: string } = {}
) => {
  // const response = options.message ? options : product;
  return {
    statusCode,
    body: JSON.stringify(product),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
