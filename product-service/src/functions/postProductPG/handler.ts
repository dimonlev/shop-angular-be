import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

import * as dotenv from 'dotenv';
import { Product } from '@functions/ProductType';

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

export const postProductPG = async (body: Omit<Product, 'id'>) => {
  const { title, description, price, count, cover } = JSON.parse(
    JSON.stringify(body)
  );

  const client = new Client(dbOptions);

  try {
    await client.connect();
    await client.query(`BEGIN`);
    const product = [title, description, price, cover];
    console.log(product);
    const insertProduct =
      'INSERT INTO products (title, description, price, cover) VALUES ($1, $2, $3, $4) RETURNING id';
    const { rows: productsData } = await client.query(insertProduct, product);
    const counts = [count, productsData[0].id];
    console.log(counts);
    const insertProductCount =
      'INSERT INTO stocks (count, product_id) VALUES ($1, $2)';
    await client.query(insertProductCount, counts);

    await client.query(`COMMIT`);
    const { rows: data } = await client.query(
      `SELECT products.id, products.title, products.price, products.description, stocks.count, products.cover FROM products INNER JOIN stocks ON products.id=stocks.product_id where products.id='${productsData[0].id}'`
    );
    return formatJSONResponse(data[0]);
  } catch (err) {
    throw new Error(err);
  } finally {
    client.end();
  }
};

export const main = middyfy(postProductPG);
