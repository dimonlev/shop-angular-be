import { Product } from '@functions/ProductType';

export const formatJSONResponse = (
  product: Product | Product[] | string,
  statusCode: number = 200
) => {
  return {
    statusCode,
    body: JSON.stringify(product),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
