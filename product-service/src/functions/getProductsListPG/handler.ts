import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';
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

const getProductsListPG = async () => {
  const client = new Client(dbOptions);
  await client.connect();
  const query = `
      SELECT products.id, products.title, products.price, products.description, products.cover, stocks.count
      FROM products
      INNER JOIN stocks ON products.id=stocks.product_id
    `;
  try {
    const { rows: products } = await client.query(query);
    return formatJSONResponse(products);
  } catch (err) {
  } finally {
    client.end();
  }
};

export const main = middyfy(getProductsListPG);
