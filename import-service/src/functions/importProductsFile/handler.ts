import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const importProductsFile = async () => {
  return formatJSONResponse('in progress');
};

export const main = middyfy(importProductsFile);
