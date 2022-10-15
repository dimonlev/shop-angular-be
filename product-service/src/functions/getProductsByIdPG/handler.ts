import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { isUuid } from 'uuidv4';
import * as dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: 5432,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const getProductsByIdPG = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  const client = new Client(dbOptions);
  await client.connect();

  try {
    if (isUuid(productId) && productId.length > 0) {
      const { rows: products } = await client.query(
        `
          SELECT products.id, products.title, products.price, products.description, stocks.count
          FROM products
          INNER JOIN stocks ON products.id=stocks.product_id
          WHERE products.id = '${productId}'
        `
      );
      return formatJSONResponse(products);
    }
  } catch (err) {
  } finally {
    client.end();
  }
};

export const main = middyfy(getProductsByIdPG);
