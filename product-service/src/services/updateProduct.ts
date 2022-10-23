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

export const updateProduct = async (
  values: Omit<Product, 'id'>,
  id: string
): Promise<string> => {
  const client = new Client(dbOptions);
  const { title, description, price, count, cover } = values;

  const textForProduct = `
        UPDATE products
        SET title='${title}', description='${description}', price=${price}, cover='${cover}'
        WHERE id='${id}'
    `;
  const textForStock = `UPDATE stocks SET count=${count} WHERE stock_id='${id}'`;

  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(textForProduct);
    await client.query(textForStock);
    await client.query('COMMIT');
    return 'result';
  } catch (error) {
    throw new Error('something went wrong update ' + JSON.stringify(error));
  } finally {
    client.end();
  }
};
