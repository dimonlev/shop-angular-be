import * as dotenv from 'dotenv';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

dotenv.config();

const s3 = new AWS.S3({ region: 'eu-west-1' });

export const importFileParser = async (event: APIGatewayProxyEvent) => {
  return 'in progress';
};

export const main = middyfy(importFileParser);
