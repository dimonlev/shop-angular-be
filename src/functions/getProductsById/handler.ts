import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { products } from '../products';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { findProduct } from '@functions/findProduct';

const getProductsById = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  return formatJSONResponse(findProduct(products, productId));
};

export const main = middyfy(getProductsById);
