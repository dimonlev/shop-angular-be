import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as dotenv from 'dotenv';

dotenv.config();

export const catalogBatchProcess = async () => {
  console.log(process.env.PG_DATABASE);
  return formatJSONResponse('in progress');
};

export const main = middyfy(catalogBatchProcess);
