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

export const delProduct = async (id: string): Promise<string> => {
  const client = new Client(dbOptions);
  const textForStock = `DELETE FROM stocks WHERE stock_id='${id}'`;
  const textForProduct = `DELETE FROM products WHERE id='${id}'`;

  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(textForStock);
    await client.query(textForProduct);
    await client.query('COMMIT');
    return 'result';
  } catch (error) {
    throw new Error('something went wrong delete ' + JSON.stringify(error));
  } finally {
    client.end();
  }
};
