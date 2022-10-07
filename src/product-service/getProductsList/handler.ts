import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { products } from '../products';

const getProductsList = async () => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
